import bcrypt from 'bcrypt';
import { env } from '@shared/helpers/ConfigEnv';
import { UserRepository } from '@/repositories/User/UserRepository';
import { ActivateDTO, ChangePasswordDTO, CheckTotpCodeDTO, LoginDTO, LogoutDTO, OauthCallbackDTO, RegisterDTO, ResendActivationDTO, ResetPasswordDTO } from '@/modules/Auth/AuthSchemas';
import { AppError } from '@/middlewares/ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';
import { CheckTotpCodeServiceResult, LoginServiceResult } from '@/modules/Auth/AuthService.types';
import { generateAuthToken, verifyAuthToken } from '@/lib/jwt';
import { AUTH_TOKEN_DURATION, AUTH_TOKEN_TYPE } from '@/types/auth.types';
import { sendToAuthQueue } from '@/helpers/SendToQueue';
import { useRedis } from '@/helpers/UseRedis';
import { verify2FACode } from '@/lib/totp';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(dto: LoginDTO): Promise<LoginServiceResult> {
    const user = await this.userRepository.getUserByEmail({ email: dto.email });
    if (!user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

    const isPasswordMatch = await bcrypt.compare(dto.password, user.passwordHash ?? '');
    if (!isPasswordMatch) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

    const requiresTOTP = user.totpEnabled;

    const token = requiresTOTP
      ? generateAuthToken({
          userId: user.id,
          duration: AUTH_TOKEN_DURATION.SHORT,
          type: AUTH_TOKEN_TYPE.TOTP,
        })
      : generateAuthToken({
          userId: user.id,
          duration: dto.rememberMe ? AUTH_TOKEN_DURATION.LONG : AUTH_TOKEN_DURATION.SHORT,
          type: AUTH_TOKEN_TYPE.AUTH,
        });

    return { requiresTOTP, token };
  }

  async checkTotpCode(dto: CheckTotpCodeDTO): Promise<CheckTotpCodeServiceResult> {
    if (!dto.token) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    const authToken = verifyAuthToken(dto.token);
    if (authToken?.type !== 'totp') throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    const user = await this.userRepository.getUserById({ id: authToken.userId });
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User is not exists', HttpStatus.NOT_FOUND);
    if (!user.secretBase32) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Totp is not enabled', HttpStatus.UNAUTHORIZED);

    const isVerified = verify2FACode(dto.code, user.secretBase32);
    if (!isVerified) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = generateAuthToken({
      userId: user.id,
      duration: dto.rememberMe ? AUTH_TOKEN_DURATION.LONG : AUTH_TOKEN_DURATION.SHORT,
      type: AUTH_TOKEN_TYPE.AUTH,
    });

    return { token };
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(dto: LogoutDTO): Promise<void> {
    const authToken = verifyAuthToken(dto.token);

    const ttl = authToken.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await useRedis.setBlacklistToken(authToken.jti, ttl);
    }
  }

  async register(dto: RegisterDTO): Promise<void> {
    const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);

    const newUser = await this.userRepository.createUser({ email: dto.email, passwordHash });
    const token = generateAuthToken({
      userId: newUser.id,
      duration: AUTH_TOKEN_DURATION.LONG,
      type: AUTH_TOKEN_TYPE.ACTIVATION,
    });

    sendToAuthQueue.sendActivationEmail(newUser.email, token);
  }

  async activate(dto: ActivateDTO): Promise<void> {
    const authToken = verifyAuthToken(dto.token);
    if (authToken.type !== AUTH_TOKEN_TYPE.ACTIVATION) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

    const user = await this.userRepository.getUserById({ id: authToken.userId });
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
    if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

    await this.userRepository.updateUserVerification({ id: authToken.userId });
  }

  async resendActivation(dto: ResendActivationDTO): Promise<void> {
    const user = await this.userRepository.getUserByEmail({ email: dto.email });
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
    if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

    const token = generateAuthToken({
      userId: user.id,
      duration: AUTH_TOKEN_DURATION.LONG,
      type: AUTH_TOKEN_TYPE.ACTIVATION,
    });
    sendToAuthQueue.sendActivationEmail(user.email, token);
  }

  async resetPassword(dto: ResetPasswordDTO): Promise<void> {
    const user = await this.userRepository.getUserByEmail({ email: dto.email });
    if (!user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

    const token = generateAuthToken({
      userId: user.id,
      duration: AUTH_TOKEN_DURATION.SHORT,
      type: AUTH_TOKEN_TYPE.RESET_PASSWORD,
    });
    sendToAuthQueue.sendResetPasswordEmail(user.email, token);
  }

  async changePassword(dto: ChangePasswordDTO): Promise<void> {
    const authToken = verifyAuthToken(dto.token);
    if (authToken.type !== AUTH_TOKEN_TYPE.RESET_PASSWORD) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

    const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);
    await this.userRepository.updateUserPassword({ id: authToken.userId, passwordHash });
  }

  async oauthCallback(dto: OauthCallbackDTO): Promise<string> {
    const user = await this.userRepository.getUserById({ id: dto.userId });
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);

    const token = generateAuthToken({
      userId: dto.userId,
      duration: AUTH_TOKEN_DURATION.LONG,
      type: AUTH_TOKEN_TYPE.AUTH,
    });
    return token;
  }
}

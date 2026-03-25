import bcrypt from 'bcrypt';
import { env } from '@shared/helpers/ConfigEnv';
import { logger } from '@shared/lib/logger';
import { changeUserPassword, createUser, getUserByEmail, getUserById, verifyUser } from '@/repositories/User/UserRepository';
import { ActivateDTO, ChangePasswordDTO, CheckTotpCodeDTO, LoginDTO, LogoutDTO, RegisterDTO, ResendActivationDTO, ResetPasswordDTO } from '@/modules/Auth/AuthSchemas';
import { AppError } from '@/middlewares/ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';
import { CheckTotpCodeServiceResult, LoginServiceResult } from '@/modules/Auth/AuthService.types';
import { generateAuthToken, verifyAuthToken } from '@/lib/jwt';
import { AUTH_TOKEN_DURATION, AUTH_TOKEN_TYPE } from '@/types/auth.types';
import { sendToAuthQueue } from '@/helpers/SendToQueue';
import { useRedis } from '@/helpers/UseRedis';
import { verify2FACode } from '@/lib/totp';

export const loginService = async (dto: LoginDTO): Promise<LoginServiceResult> => {
  const user = await getUserByEmail({ email: dto.email });
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
};

export const checkTotpCodeService = async (dto: CheckTotpCodeDTO): Promise<CheckTotpCodeServiceResult> => {
  if (!dto.token) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

  const authToken = verifyAuthToken(dto.token);
  logger.debug({ warning: authToken });
  if (authToken?.type !== 'totp') throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

  const user = await getUserById({ id: authToken.userId });
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
};

export const logoutService = async (dto: LogoutDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);

  const ttl = authToken.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await useRedis.setBlacklistToken(authToken.jti, ttl);
  }
};

export const registerService = async (dto: RegisterDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (user) throw new AppError(ErrorCodes.CONFLICT, 'User already exists', HttpStatus.CONFLICT);

  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);

  const newUser = await createUser({ email: dto.email, passwordHash });
  const token = generateAuthToken({
    userId: newUser.id,
    duration: AUTH_TOKEN_DURATION.LONG,
    type: AUTH_TOKEN_TYPE.ACTIVATION,
  });

  sendToAuthQueue.sendActivationEmail(newUser.email, token);
};

export const activateService = async (dto: ActivateDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== AUTH_TOKEN_TYPE.ACTIVATION) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
  if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

  await verifyUser({ id: authToken.userId });
};

export const resendActivationService = async (dto: ResendActivationDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
  if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

  const token = generateAuthToken({
    userId: user.id,
    duration: AUTH_TOKEN_DURATION.LONG,
    type: AUTH_TOKEN_TYPE.ACTIVATION,
  });
  sendToAuthQueue.sendActivationEmail(user.email, token);
};

export const resetPasswordService = async (dto: ResetPasswordDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const token = generateAuthToken({
    userId: user.id,
    duration: AUTH_TOKEN_DURATION.SHORT,
    type: AUTH_TOKEN_TYPE.RESET_PASSWORD,
  });
  sendToAuthQueue.sendResetPasswordEmail(user.email, token);
};

export const changePasswordService = async (dto: ChangePasswordDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== AUTH_TOKEN_TYPE.RESET_PASSWORD) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);

  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);

  await changeUserPassword({ id: authToken.userId, passwordHash });
};

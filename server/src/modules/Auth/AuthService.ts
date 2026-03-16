import bcrypt from 'bcrypt';
import {
  changeUserPassword,
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
} from '@/repositories/User/UserRepository.js';
import {
  ActivateDTO,
  ChangePasswordDTO,
  LoginDTO,
  LogoutDTO,
  RegisterDTO,
  ResendActivationDTO,
  ResetPasswordDTO,
} from '@/modules/Auth/AuthSchemas.js';
import { AppError } from '@/middlewares/ErrorHandler.js';
import { ErrorCodes } from '@/enums/ErrorCodes.js';
import { HttpStatus } from '@/enums/HttpStatus.js';
import { LoginServiceResult } from '@/modules/Auth/AuthService.types.js';
import { generateAuthToken, verifyAuthToken } from '@/lib/jwt.js';
import { env } from '@/helpers/ConfigEnv.js';
import { getChannel } from '@/lib/rabbitmq.js';
import redisClient from '@/lib/redis.js';

export const loginService = async (dto: LoginDTO): Promise<LoginServiceResult> => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const isPasswordMatch = await bcrypt.compare(dto.password, user.passwordHash);
  if (!isPasswordMatch) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const token = generateAuthToken({ userId: user.id, duration: dto.rememberMe ? 'long' : 'short', type: 'auth' });
  return { user, token };
};

export const logoutService = async (dto: LogoutDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);

  const ttl = authToken.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await redisClient.set(`habitpulse:blacklist:${authToken.jti}`, '1', { EX: ttl });
  }
};

export const registerService = async (dto: RegisterDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (user) throw new AppError(ErrorCodes.CONFLICT, 'User already exists', HttpStatus.CONFLICT);

  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);

  const newUser = await createUser({ email: dto.email, passwordHash, name: dto.email });
  const token = generateAuthToken({ userId: newUser.id, duration: 'long', type: 'activation' });
  getChannel().publish(
    'habitpulse.messages',
    'email',
    Buffer.from(JSON.stringify({ type: 'activation', email: newUser.email, token })),
    { persistent: true },
  );
};

export const activateService = async (dto: ActivateDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== 'activation')
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
  if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

  await verifyUser({ id: authToken.userId });
};

export const resendActivationService = async (dto: ResendActivationDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);
  if (user.isVerified) throw new AppError(ErrorCodes.CONFLICT, 'User is already verified', HttpStatus.CONFLICT);

  const token = generateAuthToken({ userId: user.id, duration: 'long', type: 'activation' });
  getChannel().publish(
    'habitpulse.messages',
    'email',
    Buffer.from(JSON.stringify({ type: 'activation', email: user.email, token })),
    { persistent: true },
  );
};

export const resetPasswordService = async (dto: ResetPasswordDTO): Promise<void> => {
  const user = await getUserByEmail({ email: dto.email });
  if (!user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const token = generateAuthToken({ userId: user.id, duration: 'short', type: 'resetPassword' });
  getChannel().publish(
    'habitpulse.messages',
    'email',
    Buffer.from(JSON.stringify({ type: 'resetPassword', email: user.email, token })),
    { persistent: true },
  );
};

export const changePasswordService = async (dto: ChangePasswordDTO): Promise<void> => {
  const authToken = verifyAuthToken(dto.token);
  if (authToken.type !== 'resetPassword')
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid credentials', HttpStatus.UNAUTHORIZED);

  const user = await getUserById({ id: authToken.userId });
  if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User does not exist', HttpStatus.NOT_FOUND);

  const passwordHash = await bcrypt.hash(dto.password, env.BCRYPT_ROUNDS);

  await changeUserPassword({ id: authToken.userId, passwordHash });
};

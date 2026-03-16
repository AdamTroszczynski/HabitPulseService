import jwt from 'jsonwebtoken';
import type { AuthToken, AuthTokenDuration, AuthTokenType } from '@/types/auth.types';
import { env } from '@/helpers/ConfigEnv';
import { AppError } from '@/middlewares/ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

type GenerateAuthTokenDTO = {
  userId: number;
  duration: AuthTokenDuration;
  type: AuthTokenType;
};

export const generateAuthToken = (dto: GenerateAuthTokenDTO): string => {
  const payload: Omit<AuthToken, 'exp'> = {
    jti: crypto.randomUUID(),
    userId: dto.userId,
    type: dto.type,
    duration: dto.duration,
    iat: Date.now(),
  };
  const authToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: dto.duration === 'long' ? '30d' : '15m',
  });

  return authToken;
};

export const verifyAuthToken = (token: string): AuthToken => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AuthToken;
  } catch {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid or expired token', HttpStatus.UNAUTHORIZED);
  }
};

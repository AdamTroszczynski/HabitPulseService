import { NextFunction, Request, Response } from 'express';
import { AUTH_TOKEN_NAME } from '@/const/CommonConst';
import { verifyAuthToken } from '@/lib/jwt';
import { AppError } from './ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/v1/logout') return next();
  const authToken = req.cookies[AUTH_TOKEN_NAME];

  if (!authToken) return next();

  const payload = verifyAuthToken(authToken);
  if (!payload) return next();

  if (payload.type !== 'auth') return next();

  throw new AppError(ErrorCodes.FORBIDDEN, 'User is already logged', HttpStatus.FORBIDDEN);
};

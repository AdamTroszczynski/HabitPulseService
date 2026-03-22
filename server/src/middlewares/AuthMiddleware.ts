import { NextFunction, Request, Response } from 'express';
import redisClient from '@shared/lib/redis';
import { AUTH_TOKEN_NAME } from '@/const/CommonConst';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';
import { generateAuthToken, verifyAuthToken } from '@/lib/jwt';
import { removeCookie, sendCookie } from '@/helpers/SendCookie';
import { AppError } from '@/middlewares/ErrorHandler';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies[AUTH_TOKEN_NAME];

    if (!authToken) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);

    const authTokenPayload = verifyAuthToken(authToken);
    const isOnBlacklist = await redisClient.get(`habitpulse:blacklist:${authTokenPayload.jti}`);
    if (authTokenPayload?.type !== 'auth' || isOnBlacklist) {
      removeCookie(res, AUTH_TOKEN_NAME);
      throw new AppError(ErrorCodes.UNAUTHORIZED, 'Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const oneMinuteInMs = 60 * 1000;
    const elapsed = Date.now() - authTokenPayload.iat;
    if (authTokenPayload.duration === 'short' && elapsed > oneMinuteInMs) {
      const newToken = generateAuthToken({ type: 'auth', duration: 'short', userId: authTokenPayload.userId });
      sendCookie(res, AUTH_TOKEN_NAME, newToken, false);
    }
    req.userId = authTokenPayload.userId;
    next();
  } catch (err) {
    next(err);
  }
};

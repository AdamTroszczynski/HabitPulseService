import { NextFunction, Request, Response } from 'express';
import { useRedis } from '@/helpers/UseRedis';
import { rateLimits } from '@/const/RateLimits';
import { AppError } from './ErrorHandler';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

type RateLimitTypes = 'login' | 'register';

export const rateLimitMiddleware = (type: RateLimitTypes) => async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip?.replace('::ffff:', '') ?? 'unknown';
  if (type === 'login') {
    const email = req.body?.email;
    const [ipCount, emailCount] = await Promise.all([useRedis.incrementLoginCounter('ip', ip), email ? useRedis.incrementLoginCounter('email', email) : Promise.resolve(0)]);
    if (ipCount > rateLimits.login.ip.max || emailCount > rateLimits.login.email.max) throw new AppError(ErrorCodes.TOO_MANY_REQUESTS, 'Too many requests', HttpStatus.TOO_MANY_REQUESTS);
  } else if (type === 'register') {
    const ipCount = await useRedis.incrementRegisterCounter(ip);
    if (ipCount > rateLimits.register.ip.max) throw new AppError(ErrorCodes.TOO_MANY_REQUESTS, 'Too many requests', HttpStatus.TOO_MANY_REQUESTS);
  }

  next();
};

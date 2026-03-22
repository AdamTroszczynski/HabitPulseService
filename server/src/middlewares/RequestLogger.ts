import { asyncLocalStorage } from '@shared/helpers/AsyncStore';
import { logger } from '@shared/lib/logger';
import { NextFunction, Request, Response } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const store = asyncLocalStorage.getStore();
    const responseTime = Date.now() - start;
    const isError = res.statusCode >= 400;
    if (isError) {
      logger.warn(
        {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          message: store?.errorMessage,
          responseTime,
        },
        'Incomming request failed',
      );
    } else {
      logger.info(
        {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          responseTime,
        },
        'Incomming request completed',
      );
    }
  });
  next();
};

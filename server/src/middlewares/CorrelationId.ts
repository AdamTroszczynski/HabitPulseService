import { randomUUID } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from '@shared/helpers/AsyncStore';

export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) ?? randomUUID();

  res.setHeader('x-correlation-id', correlationId);

  asyncLocalStorage.run({ correlationId, errorMessage: null }, () => next());
};

import { NextFunction, Request, Response } from 'express';
import { asyncLocalStorage } from '@shared/helpers/AsyncStore';
import { logger } from '@shared/lib/logger';
import { createAudit } from '@/repositories/Audit/AuditRepository';

export const auditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const store = asyncLocalStorage.getStore();
  res.on('finish', () => {
    createAudit({
      correlationId: store?.correlationId,
      userId: req.userId,
      url: req.url,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      error: store?.errorMessage ? store.errorMessage : undefined,
    }).catch((err) => logger.error({ err }, 'Audit log failed'));
    logger.info('Audit log saved');
  });

  next();
};

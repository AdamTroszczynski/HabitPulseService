import prisma from '@/lib/prisma';
import { CreateAuditDTO } from './AuditRepository.types';

export const createAudit = (dto: CreateAuditDTO) => {
  return prisma.audit.create({
    data: {
      correlationId: dto.correlationId ?? null,
      userId: dto.userId ?? null,
      url: dto.url,
      method: dto.method,
      ipAddress: dto.ipAddress ?? null,
      userAgent: dto.userAgent ?? null,
      statusCode: dto.statusCode,
      statusMessage: dto.statusMessage,
      error: dto.error ?? null,
    },
  });
};

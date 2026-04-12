import { PrismaClient } from '@db/client';
import { CreateAuditDTO } from '@/repositories/Audit/AuditRepository.types';

export class AuditRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createAudit(dto: CreateAuditDTO) {
    return this.prisma.audit.create({
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
  }
}

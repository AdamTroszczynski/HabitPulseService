export type CreateAuditDTO = {
  correlationId?: string;
  userId?: number;
  url: string;
  method: string;
  ipAddress?: string;
  userAgent?: string;
  statusCode: number;
  statusMessage: string;
  error?: string;
};

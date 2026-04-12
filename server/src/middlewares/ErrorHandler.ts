import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Prisma } from '@db/client';
import { logger } from '@shared/lib/logger';
import { fail } from '@/helpers/ResponsHelpers';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

export class AppError extends Error {
  constructor(
    public code: ErrorCodes,
    public message: string,
    public status: HttpStatus,
  ) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err, 'Error message');
  if (err instanceof ZodError) {
    return fail(res, ErrorCodes.VALIDATION_ERROR, err.issues[0].message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') return fail(res, ErrorCodes.NOT_FOUND, 'Record not found', HttpStatus.NOT_FOUND);
    if (err.code === 'P2002') return fail(res, ErrorCodes.CONFLICT, 'Record already exists', HttpStatus.CONFLICT);
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return fail(res, ErrorCodes.VALIDATION_ERROR, 'Invalid data', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (err instanceof AppError) {
    return fail(res, err.code, err.message, err.status);
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return fail(res, ErrorCodes.UNAUTHORIZED, 'Invalid token', HttpStatus.UNAUTHORIZED);
  }

  if (err instanceof jwt.TokenExpiredError) {
    return fail(res, ErrorCodes.UNAUTHORIZED, 'Token expired', HttpStatus.UNAUTHORIZED);
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return fail(res, ErrorCodes.VALIDATION_ERROR, 'Invalid JSON', HttpStatus.BAD_REQUEST);
  }

  return fail(res, ErrorCodes.INTERNAL_ERROR, 'Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
};

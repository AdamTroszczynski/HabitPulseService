import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { fail } from '@/helpers/ResponsHelpers';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

export class AppError extends Error {
  constructor(
    public code: ErrorCodes,
    public message: string,
    public status: number,
  ) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return fail(res, ErrorCodes.VALIDATION_ERROR, err.issues[0].message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (err instanceof AppError) {
    return fail(res, err.code, err.message, err.status);
  }

  return fail(res, ErrorCodes.INTERNAL_ERROR, 'Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
};

import { Response } from 'express';
import { ApiResponse } from '@/types/api.types.js';
import { ErrorCodes } from '@/enums/ErrorCodes.js';
import { HttpStatus } from '@/enums/HttpStatus.js';

export const ok = <T>(res: Response, data: T, status: HttpStatus = HttpStatus.OK): void => {
  res.status(status).json({ success: true, data, error: null } satisfies ApiResponse<T>);
};

export const fail = (res: Response, code: ErrorCodes, message: string, status: HttpStatus): void => {
  res.status(status).json({ success: false, data: null, error: { code, message } } satisfies ApiResponse<never>);
};

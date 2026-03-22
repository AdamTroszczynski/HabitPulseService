import { Response } from 'express';
import { asyncLocalStorage } from '@shared/helpers/AsyncStore';
import { ApiResponse } from '@/types/api.types';
import { ErrorCodes } from '@/enums/ErrorCodes';
import { HttpStatus } from '@/enums/HttpStatus';

export const ok = <T>(res: Response, data: T, status: HttpStatus = HttpStatus.OK): void => {
  res.status(status).json({ success: true, data, error: null } satisfies ApiResponse<T>);
};

export const fail = (res: Response, code: ErrorCodes, message: string, status: HttpStatus): void => {
  const store = asyncLocalStorage.getStore();
  if (store) store.errorMessage = message;
  res.status(status).json({ success: false, data: null, error: { code, message } } satisfies ApiResponse<never>);
};

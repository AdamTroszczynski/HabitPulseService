import { ErrorCodes } from '@/enums/ErrorCodes';

type ApiResponseError = {
  code: ErrorCodes;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: ApiResponseError | null;
};

import { Response } from 'express';
import { env } from './ConfigEnv.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

export const sendCookie = (res: Response, key: string, value: string, isLong: boolean) => {
  res.cookie(key, value, {
    maxAge: isLong ? 30 * 24 * 60 * 60 * 1000 : undefined,
    ...cookieOptions,
  });
};

export const removeCookie = (res: Response, key: string) => {
  res.clearCookie(key, cookieOptions);
};

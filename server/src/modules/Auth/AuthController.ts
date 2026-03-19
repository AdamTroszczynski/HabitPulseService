import { Request, Response } from 'express';
import {
  ActivateDTOSchema,
  ChangePasswordDTOSchema,
  LoginDTOSchema,
  RegisterDTOSchema,
  ResendActivationDTOSchema,
  ResetPasswordDTOSchema,
} from '@/modules/Auth/AuthSchemas';
import {
  activateService,
  changePasswordService,
  loginService,
  logoutService,
  registerService,
  resendActivationService,
  resetPasswordService,
} from '@/modules/Auth/AuthService';
import { removeCookie, sendCookie } from '@/helpers/SendCookie';
import { AUTH_TOKEN_NAME } from '@/const/CommonConst';
import { fail, ok } from '@/helpers/ResponsHelpers';
import { HttpStatus } from '@/enums/HttpStatus';
import { ErrorCodes } from '@/enums/ErrorCodes';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const dto = LoginDTOSchema.parse(req.body);
  const authToken = req.cookies[AUTH_TOKEN_NAME];

  const data = await loginService({ ...dto, token: authToken });

  sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);

  ok(res, data);
};

export const logoutController = async (req: Request, res: Response): Promise<void> => {
  const authToken = req.cookies[AUTH_TOKEN_NAME];

  if (authToken) {
    await logoutService({ token: authToken });
    removeCookie(res, AUTH_TOKEN_NAME);
    ok(res, null);
  } else fail(res, ErrorCodes.UNAUTHORIZED, 'Token does not exist', HttpStatus.UNAUTHORIZED);
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  const dto = RegisterDTOSchema.parse(req.body);

  await registerService(dto);

  ok(res, null, HttpStatus.CREATED);
};

export const activeController = async (req: Request, res: Response): Promise<void> => {
  const dto = ActivateDTOSchema.parse(req.body);

  await activateService(dto);

  ok(res, null);
};

export const resendActivationController = async (req: Request, res: Response): Promise<void> => {
  const dto = ResendActivationDTOSchema.parse(req.body);

  await resendActivationService(dto);

  ok(res, null);
};

export const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
  const dto = ResetPasswordDTOSchema.parse(req.body);

  await resetPasswordService(dto);

  ok(res, null);
};

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
  const dto = ChangePasswordDTOSchema.parse(req.body);

  await changePasswordService(dto);

  ok(res, null);
};

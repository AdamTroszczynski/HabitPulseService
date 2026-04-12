import { Request, Response } from 'express';
import { User } from '@db/client';
import { ActivateDTOSchema, ChangePasswordDTOSchema, CheckTotpCodeDTOSchema, LoginDTOSchema, RegisterDTOSchema, ResendActivationDTOSchema, ResetPasswordDTOSchema } from '@/modules/Auth/AuthSchemas';
import { AuthService } from '@/modules/Auth/AuthService';
import { removeCookie, sendCookie } from '@/helpers/SendCookie';
import { AUTH_TOKEN_NAME } from '@/const/CommonConst';
import { fail, ok } from '@/helpers/ResponsHelpers';
import { HttpStatus } from '@/enums/HttpStatus';
import { ErrorCodes } from '@/enums/ErrorCodes';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    const dto = LoginDTOSchema.parse(req.body);

    const data = await this.authService.login(dto);

    sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);

    ok(res, { requiresTOTP: data.requiresTOTP });
  }

  async checkTotpCode(req: Request, res: Response): Promise<void> {
    const dto = CheckTotpCodeDTOSchema.omit({ token: true }).parse(req.body);
    const authToken = req.cookies[AUTH_TOKEN_NAME];

    const data = await this.authService.checkTotpCode({ ...dto, token: authToken });

    sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);

    ok(res, null);
  }

  async logout(req: Request, res: Response): Promise<void> {
    const authToken = req.cookies[AUTH_TOKEN_NAME];

    if (authToken) {
      await this.authService.logout({ token: authToken });
      removeCookie(res, AUTH_TOKEN_NAME);
      ok(res, null);
    } else fail(res, ErrorCodes.UNAUTHORIZED, 'Token does not exist', HttpStatus.UNAUTHORIZED);
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto = RegisterDTOSchema.parse(req.body);

    await this.authService.register(dto);

    ok(res, null, HttpStatus.CREATED);
  }

  async active(req: Request, res: Response): Promise<void> {
    const dto = ActivateDTOSchema.parse(req.body);

    await this.authService.activate(dto);

    ok(res, null);
  }

  async resendActivation(req: Request, res: Response): Promise<void> {
    const dto = ResendActivationDTOSchema.parse(req.body);

    await this.authService.resendActivation(dto);

    ok(res, null);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const dto = ResetPasswordDTOSchema.parse(req.body);

    await this.authService.resetPassword(dto);

    ok(res, null);
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    const dto = ChangePasswordDTOSchema.parse(req.body);

    await this.authService.changePassword(dto);

    ok(res, null);
  }

  async oauthCallback(req: Request, res: Response): Promise<void> {
    const user = req.user as User;
    const token = await this.authService.oauthCallback({ userId: user.id });

    sendCookie(res, AUTH_TOKEN_NAME, token, true);

    res.redirect('/');
  }
}

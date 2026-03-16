import { ActivateDTOSchema, ChangePasswordDTOSchema, LoginDTOSchema, RegisterDTOSchema, ResendActivationDTOSchema, ResetPasswordDTOSchema, } from '../../modules/Auth/AuthSchemas.js';
import { activateService, changePasswordService, loginService, logoutService, registerService, resendActivationService, resetPasswordService, } from '../../modules/Auth/AuthService.js';
import { removeCookie, sendCookie } from '../../helpers/SendCookie.js';
import { AUTH_TOKEN_NAME } from '../../const/CommonConst.js';
import { fail, ok } from '../../helpers/ResponsHelpers.js';
import { HttpStatus } from '../../enums/HttpStatus.js';
import { ErrorCodes } from '../../enums/ErrorCodes.js';
export const loginController = async (req, res) => {
    const dto = LoginDTOSchema.parse(req.body);
    const data = await loginService(dto);
    sendCookie(res, AUTH_TOKEN_NAME, data.token, dto.rememberMe);
    ok(res, data);
};
export const logoutController = async (req, res) => {
    const authToken = req.cookies[AUTH_TOKEN_NAME];
    if (authToken) {
        await logoutService({ token: authToken });
        removeCookie(res, AUTH_TOKEN_NAME);
        ok(res, null);
    }
    else
        fail(res, ErrorCodes.UNAUTHORIZED, 'Token does not exist', HttpStatus.UNAUTHORIZED);
};
export const registerController = async (req, res) => {
    const dto = RegisterDTOSchema.parse(req.body);
    await registerService(dto);
    ok(res, null, HttpStatus.CREATED);
};
export const activeController = async (req, res) => {
    const dto = ActivateDTOSchema.parse(req.body);
    await activateService(dto);
    ok(res, null);
};
export const resendActivationController = async (req, res) => {
    const dto = ResendActivationDTOSchema.parse(req.body);
    await resendActivationService(dto);
    ok(res, null);
};
export const resetPasswordController = async (req, res) => {
    const dto = ResetPasswordDTOSchema.parse(req.body);
    await resetPasswordService(dto);
    ok(res, null);
};
export const changePasswordController = async (req, res) => {
    const dto = ChangePasswordDTOSchema.parse(req.body);
    await changePasswordService(dto);
    ok(res, null);
};
//# sourceMappingURL=AuthController.js.map
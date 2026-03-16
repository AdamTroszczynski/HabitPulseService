import { Router } from 'express';
import {
  activeController,
  changePasswordController,
  loginController,
  logoutController,
  registerController,
  resendActivationController,
  resetPasswordController,
} from '@/modules/Auth/AuthController.js';

const AuthRouter = Router();

AuthRouter.post('/login', loginController);
AuthRouter.post('/logout', logoutController);
AuthRouter.post('/register', registerController);
AuthRouter.post('/active', activeController);
AuthRouter.post('/resend-activation', resendActivationController);
AuthRouter.post('/reset-password', resetPasswordController);
AuthRouter.patch('/change-password', changePasswordController);

export { AuthRouter };

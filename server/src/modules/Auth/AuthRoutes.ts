import { Router } from 'express';
import {
  activeController,
  changePasswordController,
  loginController,
  logoutController,
  registerController,
  resendActivationController,
  resetPasswordController,
} from '@/modules/Auth/AuthController';

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.post('/register', registerController);
authRouter.post('/active', activeController);
authRouter.post('/resend-activation', resendActivationController);
authRouter.post('/reset-password', resetPasswordController);
authRouter.patch('/change-password', changePasswordController);

export { authRouter };

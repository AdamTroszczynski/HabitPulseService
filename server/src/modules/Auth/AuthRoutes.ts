import { Router } from 'express';
import passport from 'passport';
import { rateLimitMiddleware } from '@/middlewares/RateLimitMiddleware';
import {
  activeController,
  changePasswordController,
  checkTotpCodeController,
  loginController,
  logoutController,
  oauthCallbackController,
  registerController,
  resendActivationController,
  resetPasswordController,
} from '@/modules/Auth/AuthController';

const authRouter = Router();

authRouter.post('/login', rateLimitMiddleware('login'), loginController);
authRouter.post('/checkTotpCode', checkTotpCodeController);
authRouter.post('/logout', logoutController);
authRouter.post('/register', rateLimitMiddleware('register'), registerController);
authRouter.post('/active', activeController);
authRouter.post('/resend-activation', resendActivationController);
authRouter.post('/reset-password', resetPasswordController);
authRouter.patch('/change-password', changePasswordController);

// Providers
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `/` }), oauthCallbackController);
authRouter.get('/github', passport.authenticate('github', { scope: ['email', 'profile'], session: false }));
authRouter.get('/github/callback', passport.authenticate('github', { session: false, failureRedirect: `/` }), oauthCallbackController);

export { authRouter };

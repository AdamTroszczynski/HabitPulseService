import { Router } from 'express';
import passport from 'passport';
import { rateLimitMiddleware } from '@/middlewares/RateLimitMiddleware';
import { authController } from '@/containers';

const authRouter = Router();

authRouter.post('/login', rateLimitMiddleware('login'), (req, res) => authController.login(req, res));
authRouter.post('/check-totp', (req, res) => authController.checkTotpCode(req, res));
authRouter.post('/logout', (req, res) => authController.logout(req, res));
authRouter.post('/register', rateLimitMiddleware('register'), (req, res) => authController.register(req, res));
authRouter.post('/active', (req, res) => authController.active(req, res));
authRouter.post('/resend-activation', (req, res) => authController.resendActivation(req, res));
authRouter.post('/reset-password', (req, res) => authController.resetPassword(req, res));
authRouter.patch('/change-password', (req, res) => authController.changePassword(req, res));

// Providers
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `/` }), (req, res) => authController.oauthCallback(req, res));
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
authRouter.get('/github/callback', passport.authenticate('github', { session: false, failureRedirect: `/` }), (req, res) => authController.oauthCallback(req, res));

export { authRouter };

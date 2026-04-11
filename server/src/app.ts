import '@/lib/passport';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { correlationIdMiddleware } from '@/middlewares/CorrelationId';
import { requestLogger } from '@/middlewares/RequestLogger';
import { authRouter } from '@/modules/Auth/AuthRoutes';
import { apiAuthMiddleware } from '@/middlewares/ApiAuthMiddleware';
import { totpRouter } from '@/modules/Totp/TotpRoutes';
import { auditMiddleware } from '@/middlewares/AuditMiddleware';
import { authMiddleware } from '@/middlewares/AuthMiddleware';
import { profileRouter } from '@/modules/Profile/ProfileRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(correlationIdMiddleware);
app.use(requestLogger);
app.use(auditMiddleware);

app.use('/auth', authMiddleware);
app.use('/auth/v1', authRouter);

app.use('/api', apiAuthMiddleware);
app.use('/api/v1/totp', totpRouter);
app.use('/api/v1/profile', profileRouter);
app.get('/api/v1/test', (req, res) => {
  res.send('AuthWorking');
});

app.use(errorHandler);
export default app;

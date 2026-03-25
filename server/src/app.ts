import '@/lib/passport';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { logger } from '@shared/lib/logger';
import { env } from '@shared/helpers/ConfigEnv';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { correlationIdMiddleware } from '@/middlewares/CorrelationId';
import { requestLogger } from '@/middlewares/RequestLogger';
import { authRouter } from '@/modules/Auth/AuthRoutes';
import { apiAuthMiddleware } from '@/middlewares/ApiAuthMiddleware';
import { totpRouter } from '@/modules/Totp/TotpRoutes';
import { auditMiddleware } from '@/middlewares/AuditMiddleware';
import { authMiddleware } from './middlewares/AuthMiddleware';

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

logger.debug({ github: `${env.API_URL}:${env.PORT}/auth/v1/github/callback` });
app.use('/api', apiAuthMiddleware);
app.use('/api/v1/totp', totpRouter);
app.get('/api/v1/test', (req, res) => {
  res.send('AuthWorking');
});

app.use(errorHandler);
export default app;

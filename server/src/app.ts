import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { correlationIdMiddleware } from '@/middlewares/CorrelationId';
import { requestLogger } from '@/middlewares/RequestLogger';
import { authRouter } from '@/modules/Auth/AuthRoutes';
import { authMiddleware } from '@/middlewares/AuthMiddleware';
import { totpRouter } from '@/modules/Totp/TotpRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(correlationIdMiddleware);
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('<h1>Working2</h1>');
});

app.use('/auth', authRouter);

app.use('/api', authMiddleware);
app.use('/api/v1/totp', totpRouter);
app.get('/api/v1/test', (req, res) => {
  res.send('AuthWorking');
});

app.use(errorHandler);
export default app;

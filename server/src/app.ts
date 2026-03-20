import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import '@/helpers/LoadEnv';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { authRouter } from '@/modules/Auth/AuthRoutes';
import { authMiddleware } from '@/middlewares/AuthMiddleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('<h1>Working2</h1>');
});

app.use('/auth', authRouter);

app.use('/api', authMiddleware);
app.get('/api/v1/test', (req, res) => {
  res.send('AuthWorking');
});

app.use(errorHandler);
export default app;

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@/middlewares/ErrorHandler';
import { AuthRouter } from './modules/Auth/AuthRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('<h1>Working2</h1>');
});

app.use('/auth', AuthRouter);

export default app;

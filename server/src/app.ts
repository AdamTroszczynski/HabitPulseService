import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import './helpers/LoadEnv.js';
import { errorHandler } from '@/middlewares/ErrorHandler.js';
import { AuthRouter } from './modules/Auth/AuthRoutes.js';

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

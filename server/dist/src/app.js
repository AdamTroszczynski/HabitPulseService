import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('<h1>Working</h1>');
});
export default app;
//# sourceMappingURL=app.js.map
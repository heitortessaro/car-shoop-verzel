import express, { Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import errorHandler from './middleware/error';
import vehicleRouter from './routes/Vehicle';
import userRouter from './routes/User';
import { ErrorTypes } from './errors/catalog';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(vehicleRouter);
app.use(userRouter);
app.use(() => { throw new Error(ErrorTypes.InvalidRoute) })
app.use(errorHandler);

export default app;
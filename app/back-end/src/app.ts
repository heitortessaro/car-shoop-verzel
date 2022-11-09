import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import errorHandler from './middleware/error';
import vehicleRouter from './routes/Vehicle';
import userRouter from './routes/User';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(vehicleRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
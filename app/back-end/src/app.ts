import express, { Request } from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorHandler from './middleware/error';
import vehicleRouter from './routes/Vehicle';
import userRouter from './routes/User';
import { ErrorTypes } from './errors/catalog';
import morgan from 'morgan';

const app = express();
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Credentials', "true");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST")
//   res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   app.use(cors());
//   next();
// })
// app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(vehicleRouter);
app.use(userRouter);
app.use(() => { throw new Error(ErrorTypes.InvalidRoute) })
app.use(errorHandler);

export default app;
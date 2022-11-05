import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
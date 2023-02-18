import 'dotenv/config';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db';

import userModel from './models/user.model';

const port = process.env.PORT ?? 3000;

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

app.get('/api/test', async (req: Request, res: Response) => {
  try {
    const user = await userModel.create({
      name: 'hey',
      lastname: 'hey2',
      password: '123456789',
      email: 'sssdsdsssaaa'
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));

httpServer.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

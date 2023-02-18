import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth.routes';

const port = process.env.PORT ?? 3000;

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));

// routes
app.use('/api/auth', authRouter);

app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

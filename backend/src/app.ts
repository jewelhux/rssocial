import 'dotenv/config';
import path from 'path';
import express, { Response, Request } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth.routes';
import postRouter from './routes/post.routes';
import profileRouter from './routes/profile.routes';
import friendsRouter from './routes/friends.routes';
import { checkAuth } from './middleware/checkAuth';

const port = process.env.PORT ?? 3000;

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/profile', profileRouter);
app.use('/api/friends', friendsRouter);

app.get('/api/test', checkAuth, async (req: Request, res: Response) => {
  console.log(res.locals.user);
  res.status(200).json({ d: 'd' });
});

app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

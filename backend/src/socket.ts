import { Server } from 'socket.io';
import type { Server as httpServer } from 'http';
import cookieParser from 'cookie-parser';
import { Response, Request, NextFunction } from 'express';
import { checkSocketAuth } from './middleware/checkAuth';
import { reportRead } from './controllers/chat.controller';

export const initializeSocket = (httpServer: httpServer) => {
  const io = new Server(httpServer);

  io.engine.use((req, res, next) =>
    cookieParser()(req as Request, res as Response, next as NextFunction)
  );

  io.use(checkSocketAuth);

  io.on('connection', (socket) => {
    socket.join(socket.handshake.auth.user);
    socket.broadcast.emit('userStatus', { id: socket.handshake.auth.user, online: true });

    socket.on('disconnect', () =>
      socket.broadcast.emit('userStatus', {
        id: socket.handshake.auth.user,
        online: false
      })
    );

    socket.on('reportRead', (profile: string) => reportRead(socket, profile));
  });

  return io;
};

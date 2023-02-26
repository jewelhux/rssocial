import { IncomingMessage } from 'http';
import { Request } from 'express';
import { Server } from 'socket.io';

export interface CustomMessage extends IncomingMessage {
  cookies: {
    [key: string]: string;
  };
}

export interface CustomRequest extends Request {
  io: Server;
}

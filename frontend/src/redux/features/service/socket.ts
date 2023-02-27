import { io } from 'socket.io-client';

export const socket = io(`${process.env.SERVER_API_URL}/`, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});

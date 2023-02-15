import type { Middleware } from '@reduxjs/toolkit';
import { globalNavigate } from '../../components/Common/GlobalNavigate';
import { socket } from '../features/service/socket';

export const checkAuth: Middleware = () => (next) => (action) => {
  if (action?.payload?.status === 401) {
    socket.disconnect();
    globalNavigate('/auth');
  }

  return next(action);
};

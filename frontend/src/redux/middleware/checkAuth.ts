import type { Middleware } from '@reduxjs/toolkit';
import { globalNavigate } from '../../components/Common/GlobalNavigate';
import { apiSlice } from '../features/apiSlice';
import { socket } from '../features/service/socket';

export const checkAuth: Middleware = (api) => (next) => (action) => {
  if (action?.payload?.status === 401) {
    api.dispatch(apiSlice.util.resetApiState());
    socket.disconnect();
    globalNavigate('/auth');
  }

  return next(action);
};

import type { Middleware } from '@reduxjs/toolkit';
import { globalNavigate } from '../../components/Common/GlobalNavigate';

export const checkAuth: Middleware = () => (next) => (action) => {
  if (action?.payload?.status === 401) globalNavigate('/auth');

  return next(action);
};

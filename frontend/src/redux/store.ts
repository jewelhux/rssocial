import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import { checkAuth } from './middleware/checkAuth';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([checkAuth, apiSlice.middleware])
});

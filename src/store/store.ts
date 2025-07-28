import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import menuSlice from './menuSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
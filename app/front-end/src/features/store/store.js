import { configureStore } from '@reduxjs/toolkit';
import vehiclesSlice from '../features/vehiclesSlice';

export const store = configureStore({
  reducer: {
    global: vehiclesSlice
  }
});

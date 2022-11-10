import { configureStore } from '@reduxjs/toolkit';
import vehiclesSlice from '../vehicles/vehiclesSlice';

export const store = configureStore({
  reducer: {
    global: vehiclesSlice
  }
});

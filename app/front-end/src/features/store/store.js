import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../user/userSlice';
import vehiclesSlice from '../vehicles/vehiclesSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesSlice,
    user: userSlice
  }
});

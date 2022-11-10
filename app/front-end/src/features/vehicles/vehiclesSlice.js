import { createSlice } from '@reduxjs/toolkit';
import getVehicles from './getvehicles';

const initialState = {
  vehicles: [],
  loading: false,
  requestError: false
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    resetRequestError: (state) => {
      state.requestError = false;
    }
  },
  extraReducers: {
    [getVehicles.pending]: (state) => {
      state.loading = true;
    },
    [getVehicles.fulfilled]: (state, { payload }) => {
      state.vehicles = payload.results;
      state.loading = false;
    },
    [getVehicles.rejected]: (state) => {
      state.loading = false;
      state.requestError = true;
    }
  }
});

export const { resetRequestError } = vehiclesSlice.actions;

export default vehiclesSlice;

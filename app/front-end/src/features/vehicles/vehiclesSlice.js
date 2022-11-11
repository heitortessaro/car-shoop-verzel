import { createSlice } from '@reduxjs/toolkit';
import getVehicles from './getvehicles';

const initialState = {
  vehiclesList: [],
  loading: true,
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
      state.vehiclesList = payload;
      state.loading = false;
    },
    [getVehicles.rejected]: (state) => {
      state.loading = false;
      state.requestError = true;
    }
  }
});

export const selectVehicles = (state) => state.vehicles.vehiclesList;
export const selectLoading = (state) => state.vehicles.loading;

export const { resetRequestError } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;

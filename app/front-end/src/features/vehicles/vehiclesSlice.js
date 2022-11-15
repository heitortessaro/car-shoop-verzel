import { createSlice } from '@reduxjs/toolkit';
import getVehicles from './actions/getvehicles';
import saveVehicle from './actions/saveVehicle';

const initialState = {
  receivedVehicles: [],
  vehiclesList: [],
  loading: true,
  requestError: false,
  requestSucess: false
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    resetRequestError: (state) => {
      state.requestError = false;
    },
    resetRequestSucess: (state) => {
      state.requestError = false;
    },
    sortVehicleList: (state, { payload }) => {
      switch (payload) {
        case 'anoCrescente':
          state.vehiclesList = state.receivedVehicles.sort((a, b) => a.year > b.year);
          break;
        case 'anoDescrecente':
          state.vehiclesList = state.receivedVehicles.sort((a, b) => a.year < b.year);
          break;
        case 'valorCrecente':
          state.vehiclesList = state.receivedVehicles.sort((a, b) => a.buyValue > b.buyValue);
          break;
        case 'valorDecrecente':
          state.vehiclesList = state.receivedVehicles.sort((a, b) => a.buyValue < b.buyValue);
          break;
        case 'modeloAlfabetico':
          state.vehiclesList = state.receivedVehicles.sort((a, b) => a.model > b.model);
          break;
        default:
          break;
      }
    }
  },
  extraReducers: {
    [getVehicles.pending]: (state) => {
      state.loading = true;
    },
    [getVehicles.fulfilled]: (state, { payload }) => {
      state.receivedVehicles = payload;
      state.vehiclesList = payload.sort((a, b) => a.buyValue < b.buyValue);
      state.loading = false;
    },
    [getVehicles.rejected]: (state) => {
      state.loading = false;
      state.requestError = true;
    },

    [saveVehicle.fulfilled]: (state) => {
      state.requestSucess = true;
    },
    [saveVehicle.rejected]: (state) => {
      state.requestError = true;
    }
  }
});

export const selectVehicles = (state) => state.vehicles.vehiclesList;
export const selectLoading = (state) => state.vehicles.loading;
export const selectRequestSucess = (state) => state.vehicles.requestSucess;

export const { resetRequestError, sortVehicleList, resetRequestSucess } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;

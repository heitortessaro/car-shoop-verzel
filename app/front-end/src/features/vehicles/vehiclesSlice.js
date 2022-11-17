import { createSlice } from '@reduxjs/toolkit';
import getVehicles from './actions/getvehicles';
import saveVehicle from './actions/saveVehicle';
import deleteVehicle from './actions/deleteVehicle';
import updateVehicle from './actions/updateVehicle';

const initialState = {
  receivedVehicles: [],
  vehiclesList: [],
  loading: true,
  requestError: false,
  requestSucess: false,
  requestEnd: false,
  showModal: false,
  idToRemove: '',
  infoToUpdate: {}
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    resetRequestInfo: (state) => {
      state.requestError = false;
      state.requestEnd = false;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
    showModal: (state) => {
      state.showModal = true;
    },
    setIdToRemove: (state, { payload }) => {
      state.idToRemove = payload;
    },
    setInfoToUpdate: (state, { payload }) => {
      state.infoToUpdate = payload;
    },
    resetInfoToUpdate: (state) => {
      state.infoToUpdate = null;
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
    // GET
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
    // SAVE
    [saveVehicle.fulfilled]: (state) => {
      state.requestSucess = true;
      state.requestEnd = true;
    },
    [saveVehicle.rejected]: (state) => {
      state.requestError = true;
      state.requestEnd = true;
    },
    // DELETE
    [deleteVehicle.fulfilled]: (state) => {
      state.requestSucess = true;
      state.requestEnd = true;
    },
    [deleteVehicle.rejected]: (state) => {
      state.requestError = true;
      state.requestEnd = true;
    },
    // UPDATE
    [updateVehicle.fulfilled]: (state) => {
      state.requestSucess = true;
      state.requestEnd = true;
      state.infoToUpdate = {};
    },
    [updateVehicle.rejected]: (state) => {
      state.requestError = true;
      state.requestEnd = true;
    }
  }
});

export const selectVehicles = (state) => state.vehicles.vehiclesList;
export const selectLoading = (state) => state.vehicles.loading;
export const selectRequestSucess = (state) => state.vehicles.requestSucess;
export const selectRequestEnd = (state) => state.vehicles.requestEnd;
export const selectIdToRemove = (state) => state.vehicles.idToRemove;
export const selectShowModal = (state) => state.vehicles.showModal;
export const selectInfoToUpdate = (state) => state.vehicles.infoToUpdate;

export const {
  setIdToRemove,
  hideModal,
  showModal,
  resetRequestInfo,
  sortVehicleList,
  setInfoToUpdate,
  resetInfoToUpdate
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;

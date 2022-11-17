import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async ({ authorizationToken, vehicleId }) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/vehicles/${vehicleId}`;
    try {
      const { data } = await axios({
        method: 'delete',
        url: url,
        headers: {
          Authorization: authorizationToken
        }
      });
      return data;
    } catch (AxiosError) {
      console.log(AxiosError);
    }
  }
);

export default deleteVehicle;

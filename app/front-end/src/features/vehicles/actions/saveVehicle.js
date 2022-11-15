import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const saveVehicle = createAsyncThunk(
  'vehicles/saveVehicle',
  async ({ authorizationToken, formData }) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/vehicles`;
    try {
      const { data } = await axios({
        method: 'post',
        url: url,
        headers: {
          Authorization: authorizationToken
        },
        data: formData
      });
      return data;
    } catch (AxiosError) {
      console.log(AxiosError);
    }
  }
);

export default saveVehicle;

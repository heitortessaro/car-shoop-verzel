import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const getVehicles = createAsyncThunk('vehicles/getVehicles', async () => {
  let url = `${import.meta.env.VITE_API_BASE_URL}/vehicles`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (AxiosError) {
    console.log(AxiosError);
  }
});

export default getVehicles;

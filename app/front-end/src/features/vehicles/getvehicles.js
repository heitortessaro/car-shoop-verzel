import { createAsyncThunk } from '@reduxjs/toolkit';

const getVehicles = createAsyncThunk('vehicles/getVehicles', async () => {
  let url = 'http:localhost:3001/vehicles';
  try {
    const resolve = await fetch(url);
    const data = await resolve.json();
    return data.items;
  } catch (error) {
    console.log(`getVehicles ${error.message}`);
  }
});

export default getVehicles;

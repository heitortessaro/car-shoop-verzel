import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const loginUser = createAsyncThunk('user/loginUser', async (userInfo) => {
  let url = `${import.meta.env.VITE_API_BASE_URL}/users`;
  console.log(userInfo);
  try {
    const { data } = await axios({
      method: 'post',
      url: url,
      data: {
        email: userInfo.email,
        password: userInfo.password
      }
    });
    return data;
  } catch (AxiosError) {
    console.log(AxiosError);
  }
});

export default loginUser;

import { createSlice } from '@reduxjs/toolkit';
import loginUser from './actions/loginUser';
import jwt_decode from 'jwt-decode';

const initialState = {
  userName: '',
  token: '',
  requestError: false,
  logged: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRequestError: (state) => {
      state.requestError = false;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      const { name, lastName } = jwt_decode(payload.token);
      console.log(jwt_decode(payload.token));
      state.token = payload.token;
      state.name = name + lastName;
      state.loading = false;
      state.logged = true;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
      state.requestError = true;
    }
  }
});

export const selectUserName = (state) => state.user.userName;
export const selectToken = (state) => state.user.token;
export const selectLogged = (state) => state.user.logged;

export const { resetRequestError } = userSlice.actions;

export default userSlice.reducer;

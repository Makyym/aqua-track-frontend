import { createSlice } from '@reduxjs/toolkit';
import {
  logout,
  patchUser,
  refreshToken,
  refreshUser,
  signIn,
  signUp,
} from './operations.js';

const initialState = {
  user: {
    name: null,
    email: null,
    gender: null,
    dailyNorm: null,
    weight: null,
    dailySportTime: null,
    avatarUrl: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.user.email = payload.data.email;
        state.user.gender = payload.data.gender;
        state.user.weight = payload.data.weight;
        state.user.dailyNorm = payload.data.dailyNorm;
        state.user.activeTime = payload.data.dailySportTime;
        state.user.avatarUrl = payload.data.avatarUrl;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(signIn.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.token = payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(signIn.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const authReducer = slice.reducer;

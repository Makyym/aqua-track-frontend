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
        state.user = {
          ...state.user,
          ...payload.data,
        };
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
        state.token = payload.data.token;
        state.isLoggedIn = true;
        state.user = {
          ...state.user,
          ...payload.data,
        };
      })
      .addCase(signIn.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = {
          ...state.user,
          ...payload.data,
        };
      })
      .addCase(refreshUser.pending, (state, { payload }) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.data.accessToken;
      })
      .addCase(patchUser.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload.data,
        };
      });
  },
});

export const authReducer = slice.reducer;

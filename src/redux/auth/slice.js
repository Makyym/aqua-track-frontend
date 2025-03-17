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
    avatarUrl: "https://res.cloudinary.com/dvc0lg6q7/image/upload/v1741163238/person_qyhqpa.png",
  },
  token: null,
  isError: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = state => {
  state.isRefreshing = true;
  state.isError = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.isError = payload;
}

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isError = null;
        state.isRefreshing = false;
        state.user = {
          ...state.user,
          ...payload.data,
        };
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isError = null;
        state.isRefreshing = false;
        state.token = payload.data.token;
        state.isLoggedIn = true;
        state.user = {
          ...state.user,
          ...payload.data,
        };
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.isError = null;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = {
          ...state.user,
          ...payload.data,
        };
      })
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isError = null;
        state.token = payload.data.accessToken;
      })
      .addCase(patchUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isError = null;
        state.user = {
          ...state.user,
          ...payload.data,
        };
      });
  },
});

export const authReducer = slice.reducer;

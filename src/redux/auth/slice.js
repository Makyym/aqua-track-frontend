import { createSlice } from "@reduxjs/toolkit";
import { logout, signIn, signUp } from "./operations.js";

const initialState = {
    user: {
        name: null,
        email: null,
        gender: null,
        dailyNorm: null,
        weight: null,
        activeTime: null,
        avatarUrl: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.isRefreshing = false;
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(signUp.rejected, (state) => {
                state.isRefreshing = false;
            })
            .addCase(signIn.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.isRefreshing = false;
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            .addCase(signIn.rejected, (state) => {
                state.isRefreshing = false;
            })
            .addCase(logout.fulfilled, () => initialState)
    },
});

export const authReducer = slice.reducer;
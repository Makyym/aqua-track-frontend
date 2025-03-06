import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-aqt-api.onrender.com';

export const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

export const signUp = createAsyncThunk('auth/signUp', async (credentials, thunkAPI) => {
    try {
        const register = await axios.post('/users/register', credentials);
        if (register) {
            const response = await axios.post('/users/login', credentials);
            setAuthHeader(response.data.token);
            return {
                ...register.data,
                token: response.data.accessToken,
            }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signIn = createAsyncThunk('auth/signIn', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('/users/login', credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const refreshUser = () => {};
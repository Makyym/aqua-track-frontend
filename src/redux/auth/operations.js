import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-aqt-api.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const maxRetries = 3;
        originalRequest._retryCount = originalRequest._retryCount || 0;
        if (error.response.status === 401 && originalRequest._retryCount < maxRetries) {
            originalRequest._retryCount += 1;
            try {
                const { data } = await axios.post('/users/refresh');
                const token = data.data.accessToken;
                setAuthHeader(token);
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (refreshError) {
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const signUp = createAsyncThunk('auth/signUp', async (credentials, thunkAPI) => {
    try {
        const register = await axios.post('/users/register', credentials);
        if (register) {
            const response = await axios.post('/users/login', credentials);
            setAuthHeader(response.data.data.accessToken);
            return {
                ...register.data,
                token: response.data.data.accessToken,
            }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signIn = createAsyncThunk('auth/signIn', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('/users/login', credentials);
        setAuthHeader(response.data.data.accessToken);
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

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    try {
        const savedToken = thunkAPI.getState().auth.token;
        if (!savedToken) {
            return thunkAPI.rejectWithValue('Token is not exist');
        }
        setAuthHeader(savedToken);
        const { data } = await axios.get('/users/userinfo');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    };
});

// export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
//     try {
//         const { data } = await axios.post('/users/refresh');
//         console.log(data);
//         return data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//     };
// });
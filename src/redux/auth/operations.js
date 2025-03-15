import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { lazy } from 'react';

axios.defaults.baseURL = 'https://project-aqt-api.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor caught an error", error);
    const { config, response, status } = error;
    if (status === 401 && response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const { store } = await import('../store');
        const refreshResult = await store.dispatch(refreshToken());
        if (refreshResult.error) {
          return Promise.reject(refreshResult.error.message);
        }
        const newToken = refreshResult.payload.data.accessToken;
        setAuthHeader(newToken) 
        config.headers.Authorization = `Bearer ${newToken}`;
        setAuthHeader(newToken);
        return axios(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, thunkAPI) => {
    try {
      const register = await axios.post('/users/register', credentials);
      if (register) {
        const response = await axios.post('/users/login', credentials);
        setAuthHeader(response.data.data.accessToken);
        return {
          ...register.data,
          token: response.data.data.accessToken,
        };
      }
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.data.accessToken);
      const { data } = await axios.get('/users/userinfo');
      data.data.token = response.data.data.accessToken;
      console.log(data);
      return data;
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token does not exist');
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await axios.get('/users/userinfo');
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.data?.message || 'Unexpected error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/refresh');
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const patchUser = createAsyncThunk(
  'auth/patchUser',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/userinfo', body, {headers: {
        'Content-Type': 'multipart/form-data'
      }
      });
      return data;
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const googleAuthUser = createAsyncThunk(
  'auth/googleAuth',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/auth/get-oauth-url');
      window.location.href = data.data.url;
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-aqt-api.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

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
      return response.data;
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
    try {
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) {
        return thunkAPI.rejectWithValue('Token does not exist');
      }
      setAuthHeader(savedToken);
      const { data } = await axios.get('/users/userinfo');
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const refreshResult = await thunkAPI.dispatch(refreshToken());
          if (refreshResult.error) {
            throw new Error(refreshResult.error.message);
          }
          const { data } = await axios.get('/users/userinfo');
          return data;
        } catch (refreshError) {
          const errorMessage = refreshError.response.data.data.message;
          return thunkAPI.rejectWithValue(errorMessage);
        }
      }
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
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
      const { data } = await axios.patch('/users/userinfo', body);
      return data;
    } catch (error) {
      const errorMessage = error.response.data.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

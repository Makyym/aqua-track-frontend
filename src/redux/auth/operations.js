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
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const signIn = createAsyncThunk(
//   'auth/signIn',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post('/users/login', credentials);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
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
          return thunkAPI.rejectWithValue(refreshError.message);
        }
      }
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const patchUser = createAsyncThunk(
  'auth/patchUser',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.patch('/users/userinfo', body);

      return data;
    } catch (error) {}
  },
);

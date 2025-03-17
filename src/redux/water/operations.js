import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWaterDay = createAsyncThunk(
  'water/fetchWaterDay',
  async (date, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.get(`water/day?date=${date}`);
      return {
        array: data,
        date,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchWaterMonth',
  async (date, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.get(`water/month?month=${date}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addWaterEntry = createAsyncThunk(
  'water/addWaterEntry',
  async (body, thunkAPI) => {
    try {
      const {
        data
      } = await axios.post('water', body);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async (waterId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`water/${waterId}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const editWaterEntry = createAsyncThunk(
  'water/editWaterEntry',
  async ({ id, value, date, oldValue }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.patch(`water/${id}`, { value, date });
      const response = {
        ...data,
        oldValue,
      };
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

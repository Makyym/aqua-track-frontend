import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWaterDay = createAsyncThunk(
  'water/fetchWaterDay',
  async (date, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.get(`water/day?date=${date}`);
      return data;
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
        data: { data },
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
      const response = await axios.delete(`water/${waterId}`);
      return waterId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

// возвращать айди в удалении

export const editWaterEntry = createAsyncThunk(
  'water/editWaterEntry',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.patch(`water/${id}`, { name, number });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

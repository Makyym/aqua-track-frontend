import { createSlice } from '@reduxjs/toolkit';
import { addWaterEntry, deleteWaterEntry, editWaterEntry, fetchWaterDay, fetchWaterMonth } from './operations.js';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const initialState = {
  waterActiveDay: [],
  waterCurrentDay: [],
  waterMonth: [],
  isLoading: false,
  isError: null,
  currentDate: formattedDate,
  activeDate: null, // Початково день не вибраний
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.isError = payload;
}

const slice = createSlice({
  name: 'aqua',
  initialState,
  reducers: {
    updateActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    resetActiveDate: state => {
      state.activeDate = null;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchWaterDay.pending, handlePending)
    .addCase(fetchWaterDay.rejected, handleRejected)
    .addCase(fetchWaterDay.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = null;
      if (state.currentDate === payload.date) {
        state.waterCurrentDay = payload.array;
      }
      if (state.currentDate === state.activeDate) {
        state.waterActiveDay = [...state.waterCurrentDay];
      }
      state.waterActiveDay = payload.array;
    })
    .addCase(fetchWaterMonth.pending, handlePending)
    .addCase(fetchWaterMonth.rejected, handleRejected)
    .addCase(fetchWaterMonth.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = null;
      state.waterMonth = payload;
    })
    .addCase(addWaterEntry.pending, handlePending)
    .addCase(addWaterEntry.rejected, handleRejected)
    .addCase(addWaterEntry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      const fullDate = payload.data.date;
      const dateOnly = fullDate.split("T")[0];
      if (state.activeDate && dateOnly === state.activeDate) {
        state.waterActiveDay.push(payload.data);
      }
      if (dateOnly === state.currentDate) {
        state.waterCurrentDay.push(payload.data);
      }
    })
    .addCase(deleteWaterEntry.pending, handlePending)
    .addCase(deleteWaterEntry.rejected, handleRejected)
    .addCase(deleteWaterEntry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      const date = payload.data.date;
      const dateOnly = date.split("T")[0];
      if (dateOnly === state.currentDate) {
        state.waterCurrentDay = state.waterCurrentDay.filter(item => item._id !== payload.data._id);
      }
      state.waterActiveDay = state.waterActiveDay.filter(item => item._id !== payload.data._id);
      
    })
    .addCase(editWaterEntry.pending, handlePending)
    .addCase(editWaterEntry.rejected, handleRejected)
    .addCase(editWaterEntry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      const waterItem = state.waterActiveDay.find(item => item._id === payload._id);
      if (!waterItem) {
        const waterCard = state.waterCurrentDay.find(item => item._id === payload._id);
        waterCard.value = payload.value;
        waterCard.date = payload.date;
      }
      waterItem.value = payload.value;
      waterItem.date = payload.date;
    })
  }
});

export const { updateActiveDate, resetActiveDate } = slice.actions;
export const waterReducer = slice.reducer;

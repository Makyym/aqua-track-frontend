import { createSlice } from '@reduxjs/toolkit';
import { addWaterEntry, deleteWaterEntry, editWaterEntry, fetchWaterDay, fetchWaterMonth } from './operations.js';

const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

const initialState = {
  waterDay: [],
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
      state.activeDate = action.payload; // Оновлюємо вибрану дату
    },
    resetActiveDate: state => {
      state.activeDate = null; // Скидаємо вибір
    },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchWaterDay.pending, handlePending)
    .addCase(fetchWaterDay.rejected, handleRejected)
    .addCase(fetchWaterDay.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isError = null;
      state.waterDay = payload;
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
      state.waterDay.push(payload);
    })
    .addCase(deleteWaterEntry.pending, handlePending)
    .addCase(deleteWaterEntry.rejected, handleRejected)
    .addCase(deleteWaterEntry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      state.waterDay = state.waterDay.filter(item => item._id !== payload);
    })
    .addCase(editWaterEntry.pending, handlePending)
    .addCase(editWaterEntry.rejected, handleRejected)
    .addCase(editWaterEntry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = null;
      const waterItem = state.waterDay.find(item => item._id === payload._id);
      waterItem.value = payload.value;
      waterItem.date = payload.date;
    })
  }
});

export const { updateActiveDate, resetActiveDate } = slice.actions;
export const waterReducer = slice.reducer;

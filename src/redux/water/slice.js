import { createSlice } from '@reduxjs/toolkit';
// import { fetchAqua, addAqua } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  activeDate: null, // Початково день не вибраний
};

const slice = createSlice({
  name: 'aqua',
  initialState,
  //
  reducers: {
    updateActiveDate: (state, action) => {
      state.activeDate = action.payload; // Оновлюємо вибрану дату
    },
    resetActiveDate: state => {
      state.activeDate = null; // Скидаємо вибір
    },
  },
});

export const { updateActiveDate, resetActiveDate } = slice.actions;
export const waterReducer = slice.reducer;

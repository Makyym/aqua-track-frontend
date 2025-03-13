import { formatDate } from './dateUtils';
import toast from 'react-hot-toast';

export const handlePrevMonth = (month, year, setMonth, setYear) => {
  if (month === 0) {
    setMonth(11);
    setYear(year - 1);
  } else {
    setMonth(month - 1);
  }
};
export const handleNextMonth = (month, year, setMonth, setYear) => {
  if (month === 11) {
    setMonth(0);
    setYear(year + 1);
  } else {
    setMonth(month + 1);
  }
};

//обирає день
export const handleActiveDay = (
  day,
  month,
  year,
  activeDate,
  dispatch,
  resetActiveDate,
  updateActiveDate,
) => {
  if (activeDate === day) {
    dispatch(resetActiveDate()); // Якщо день вже вибраний, скидаємо
    return;
  }
  //форматуємо дату для Redux Toolkit - string "YYYY-MM-DD"
  const selectedDate = formatDate(year, month, day);
  const today = new Date().toISOString().split('T')[0];

  // чи обрана дата не є майбутньою
  if (selectedDate > today) {
    toast.error('You cannot select a future date!');
    return;
  }

  dispatch(updateActiveDate(selectedDate)); //string
};

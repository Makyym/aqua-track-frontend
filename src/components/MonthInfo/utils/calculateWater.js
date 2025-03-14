// Обчислення відсотка води за день
import { formatDate } from './dateUtils';

export const calculateWaterPercentage = (
  day,
  year,
  month,
  waterMonth,
  dailyNorm,
) => {
  const formattedDate = formatDate(year, month, day); //"YYYY-MM-DD"
  const totalWaterDay = waterMonth[formattedDate] || 0; //отримуємо значення води за день
  return Math.min(Math.round((totalWaterDay * 100) / dailyNorm), 100);
};

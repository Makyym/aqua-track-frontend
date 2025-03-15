// Форматування дат
export const formatDate = (year, month, day) => {
  const formattedDay = day.toString().padStart(2, '0'); // 7 -> 07
  const formattedMonth = (month + 1).toString().padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`; // "YYYY-MM-DD"
};

export const formatCurrentMonth = (year, month) => {
  const formattedMonth = (month + 1).toString().padStart(2, '0');
  return `${year}-${formattedMonth}`; // "YYYY-MM"
};
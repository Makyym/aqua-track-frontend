import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import s from './MonthInfo.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDate } from '../../redux/water/selectors';
import { resetActiveDate, updateActiveDate } from '../../redux/water/slice';
import { selectUser } from '../../redux/auth/selectors';

//Для прикладу, замінити на fetch
import data from '../../assets/data.json';
const response = data;

const formatDate = (year, month, day) => {
  const formattedDay = day.toString().padStart(2, '0'); // 7 -> 07
  const formattedMonth = (month + 1).toString().padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`; // "YYYY-MM-DD"
};

const MonthInfo = () => {
  //dailyNorm
  const user = useSelector(selectUser);
  const dailyNorm = user?.dailyNorm || 1500;

  console.log('💡 dailyNorm in MonthInfo:', dailyNorm); // Лог тут, щоб побачити значення dailyNorm

  //----
  const dispatch = useDispatch();
  const activeDate = useSelector(selectActiveDate);

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  //обирає день
  const handleActiveDay = day => {
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

  const calculateWaterPercentage = day => {
    const formattedDate = formatDate(year, month, day); //"YYYY-MM-DD"

    const dailyWaterRecords = response.data.data.filter(
      entry => entry.date === formattedDate,
    );

    const totalWaterDay = dailyWaterRecords.reduce(
      (sum, record) => sum + record.value,
      0,
    );

    return Math.min(Math.round((totalWaterDay * 100) / dailyNorm), 100);
  };

  return (
    //   прибрати className={s.monthInfo} ?? при desktop задає width: 608px;
    <div className={s.monthInfo}>
      <CalendarPagination
        month={month}
        year={year}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <Calendar
        month={month}
        year={year}
        activeDate={activeDate}
        handleActiveDay={handleActiveDay}
        percentage={calculateWaterPercentage}
      />
    </div>
  );
};

export default MonthInfo;

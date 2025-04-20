import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import s from './MonthInfo.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveDate,
  selectWaterMonth,
} from '../../redux/water/selectors';
import { resetActiveDate, updateActiveDate } from '../../redux/water/slice';
import { selectUser } from '../../redux/auth/selectors';
import { fetchWaterMonth } from '../../redux/water/operations';
//utils
import { formatCurrentMonth } from './utils/dateUtils'; // "YYYY-MM-DD"
import { calculateWaterPercentage } from './utils/calculateWater';
import {
  handleActiveDay,
  handleNextMonth,
  handlePrevMonth,
} from './utils/calendarUtils';

const MonthInfo = () => {
  const user = useSelector(selectUser);
  const dailyNorm = user?.dailyNorm || 1500;

  const dispatch = useDispatch();
  const activeDate = useSelector(selectActiveDate);
  const waterMonth = useSelector(selectWaterMonth);

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const formattedMonth = formatCurrentMonth(year, month);

  useEffect(() => {
    const selectedDate = new Date(year, month, 1);
    const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    if (selectedDate > currentMonthDate) return;
    dispatch(fetchWaterMonth(formattedMonth));
  }, [dispatch, formattedMonth]);

  return (
    <div className={s.monthInfo}>
      <CalendarPagination
        month={month}
        year={year}
        handlePrevMonth={() => handlePrevMonth(month, year, setMonth, setYear)}
        handleNextMonth={() => handleNextMonth(month, year, setMonth, setYear)}
      />
      <Calendar
        month={month}
        year={year}
        activeDate={activeDate}
        handleActiveDay={day =>
          handleActiveDay(
            day,
            month,
            year,
            activeDate,
            dispatch,
            resetActiveDate,
            updateActiveDate,
          )
        }
        percentage={day =>
          calculateWaterPercentage(day, year, month, waterMonth, dailyNorm)
        }
      />
    </div>
  );
};

export default MonthInfo;

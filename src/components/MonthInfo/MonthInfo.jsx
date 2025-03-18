import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import s from './MonthInfo.module.css';
import toast from 'react-hot-toast';
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
//
import Statistics from './Statistics';

const MonthInfo = () => {
  //dailyNorm
  const user = useSelector(selectUser);
  const dailyNorm = user?.dailyNorm || 1500;

  const dispatch = useDispatch();
  const activeDate = useSelector(selectActiveDate);
  const waterMonth = useSelector(selectWaterMonth);

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const formatedMonth = formatCurrentMonth(year, month);

  useEffect(() => {
    dispatch(fetchWaterMonth(formatedMonth));
  }, [dispatch, formatedMonth]);

  //
  const [showStatistics, setShowStatistics] = useState(false); //перемикання на графік

  return (
    //   прибрати className={s.monthInfo} ?? при desktop задає width: 608px;
    <div className={s.monthInfo}>
      <CalendarPagination
        month={month}
        year={year}
        handlePrevMonth={() => handlePrevMonth(month, year, setMonth, setYear)}
        handleNextMonth={() => handleNextMonth(month, year, setMonth, setYear)}
        toggleStatistics={() => setShowStatistics(!showStatistics)} //протилежне до поточного значення
        showStatistics={showStatistics}
      />
      {showStatistics ? (
        <Statistics month={month} year={year} />
      ) : (
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
      )}
    </div>
  );
};

export default MonthInfo;

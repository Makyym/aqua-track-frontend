import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import s from './MonthInfo.module.css';
import { useState } from 'react';

const MonthInfo = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [activeDate, setActiveDate] = useState(null); //зберігаємо обраний день (повна дата)

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
    const selectedDate = new Date(year, month, day);
    setActiveDate(selectedDate);
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
      />
    </div>
  );
};

export default MonthInfo;

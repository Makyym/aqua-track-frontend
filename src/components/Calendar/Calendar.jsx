import CalendarItem from '../CalendarItem/CalendarItem';
import s from './Calendar.module.css';

const Calendar = ({ month, year, activeDate, handleActiveDay, percentage }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <ul className={s.calendarList}>
        {daysArray.map(day => (
          <li key={day} className={s.calendarItem}>
            <CalendarItem
              day={day}
              month={month}
              year={year}
              activeDate={activeDate}
              handleActiveDay={handleActiveDay}
              percentage={percentage}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;

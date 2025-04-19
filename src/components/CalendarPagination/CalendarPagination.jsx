import s from './CalendarPagination.module.css';
import sprite from "../../assets/newSprite.svg";

const CalendarPagination = ({
  month,
  year,
  handlePrevMonth,
  handleNextMonth,
}) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const nameMonth = monthNames[month];

  return (
    <div className={s.calendarPaginationContainer}>
      <h3 className={s.calendarTitle}>Month</h3>
      <div className={s.paginationWrapper}>
        <div className={s.calendarPagination}>
          <button onClick={handlePrevMonth} className={s.btnCalendarPagination}>
            <svg className={s.iconLeft}>
              <use href={`${sprite}#icon-chevron-left`} />
            </svg>
          </button>
          <p className={s.calendarPaginationText}>
            {nameMonth}, {year}
          </p>
          <button onClick={handleNextMonth} className={s.btnCalendarPagination}>
            <svg className={s.iconRight}>
              <use href={`${sprite}#icon-chevron-rigth`} />
            </svg>
          </button>
        </div>
        <svg className={s.iconStatistic}>
          <use href={`${sprite}#icon-statistics`} />
        </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;

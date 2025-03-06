import s from './CalendarPagination.module.css';

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
            <svg className={s.icon}>
              <use href="/sprite.svg#icon-chevron-left" />
            </svg>
          </button>
          <p className={s.calendarPaginationText}>
            {nameMonth}, {year}
          </p>
          <button onClick={handleNextMonth} className={s.btnCalendarPagination}>
            <svg className={s.icon}>
              <use href="/sprite.svg#icon-chevron-right" />
            </svg>
          </button>
        </div>
        <svg className={s.iconStatistic}>
          <use href="/sprite.svg#icon-statistics" />
        </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;

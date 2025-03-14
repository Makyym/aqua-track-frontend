import clsx from 'clsx';
import s from './CalendarItem.module.css';

const CalendarItem = ({
  day,
  month,
  year,
  activeDate,
  handleActiveDay,
  percentage,
}) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const isCurrentDay =
    currentDate.getMonth() === month &&
    currentDate.getFullYear() === year &&
    currentDay === day;

  const isActiveDayInCurrentMonth = () => {
    if (!activeDate) return false;
    const parsedActiveDate = new Date(activeDate); //перетворюємо рядок в Date

    return (
      parsedActiveDate?.getDate() === day &&
      parsedActiveDate?.getMonth() === month &&
      parsedActiveDate?.getFullYear() === year
    );
  };
  const isPastDay = new Date(year, month, day) < new Date();
  return (
    <>
      <button
        onClick={() => handleActiveDay(day)}
        className={clsx(
          s.calendarDay,
          percentage(day) < 100 && s.dayNotEnough,
          isActiveDayInCurrentMonth(day) && s.isActive,
          isCurrentDay && day === currentDay && s.isToday, //чи поточний день належить поточному місяцю
        )}
      >
        {day}
      </button>
      <p className={s.informQuantity}>
        {new Date(year, month, day) <= new Date() && `${percentage(day)}%`}
        {/* % тільки на днях що вже відбулися */}
      </p>
    </>
  );
};

export default CalendarItem;

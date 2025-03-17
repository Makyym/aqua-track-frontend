import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaterMonth } from '../../redux/water/operations';
import { formatCurrentMonth } from './utils/dateUtils';
import { selectWaterMonth } from '../../redux/water/selectors';

import s from './Statistics.module.css';

const Statistics = ({ month, year }) => {
  const dispatch = useDispatch();
  const waterMonth = useSelector(selectWaterMonth); //дані {YYYY-MM-DD: value, ...}
  const [chartData, setChartData] = useState([]);

  const formatedMonth = formatCurrentMonth(year, month); //YYYY-MM string

  useEffect(() => {
    dispatch(fetchWaterMonth(formatedMonth));
  }, [dispatch, formatedMonth]);
  console.log('waterMonth =====', waterMonth);

  //   // Функція для створення масиву останніх 7 днів
  //   const getLastSevenDays = () => {
  //     return Array.from({ length: 7 }, (_, i) => {
  //       const date = new Date(); //дата для кожної ітерації циклу,

  //       date.setDate(new Date().getDate() - (6 - i)); // Від 7 днів тому до сьогодні
  //       const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

  //       return {
  //         name: date.getDate().toString().padStart(2, '0'), // Витягуємо день (DD)
  //         uv: waterMonth[formattedDate] || 0, // Якщо немає даних, встановлюємо 0
  //         fullDate: formattedDate, // Зберігаємо повну дату для сортування
  //       };
  //     });
  //   };
  //   const rawData = getLastSevenDays();

  // 🔹 Чекаємо, поки `waterMonth` оновиться
  useEffect(() => {
    if (!waterMonth || Object.keys(waterMonth).length === 0) return;

    const getLastSevenDays = () => {
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(year, month, new Date().getDate() - (6 - i)); // Враховуємо вибраний місяць
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // YYYY-MM-DD

        console.log(
          '📅 Перевіряємо дату:',
          formattedDate,
          '💧 Вода:',
          waterMonth[formattedDate] || 0,
        );

        return {
          name: date.getDate().toString().padStart(2, '0'),
          uv: waterMonth[formattedDate] || 0, // Якщо немає даних, встановлюємо 0
        };
      });
    };

    setChartData(getLastSevenDays());
  }, [waterMonth, month, year]);

  return (
    <div className={s.statisticsContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 40,
          }}
        >
          {/* градієнт заливки */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9BE1A0" />
              <stop offset="100%" stopColor="rgba(155, 225, 160, 0)" />
            </linearGradient>
          </defs>

          <XAxis axisLine={false} dataKey="name" tickLine={false} />
          <YAxis
            domain={[0, 'dataMax']}
            axisLine={false} //намальована лінія осі
            tickLine={false}
            ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]} // Фіксовані значення
            tickFormatter={value => {
              if (value === 0) return '0%';
              return `${value / 1000}L`; // Перетворення у літри
            }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#9BE1A0"
            fill="url(#gradient)"
            dot={{
              r: 5,
              fill: 'transparent',
              stroke: '#9BE1A0',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;

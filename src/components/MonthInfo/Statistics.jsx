import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaterMonth } from '../../redux/water/operations';
import { formatCurrentMonth } from './utils/dateUtils';
import { selectWaterMonth } from '../../redux/water/selectors';

import s from './Statistics.module.css';

const Statistics = ({ month, year }) => {
  const dispatch = useDispatch();
  const waterMonth = useSelector(selectWaterMonth); //дані {YYYY-MM-DD: value, ...}
  const [chartData, setChartData] = useState([]); //дані за місяць

  const today = new Date();

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const formatedMonth = formatCurrentMonth(year, month); //YYYY-MM string

  useEffect(() => {
    dispatch(fetchWaterMonth(formatedMonth));
  }, [dispatch, formatedMonth]);

  //--
  const generateChartData = useMemo(() => {
    if (!waterMonth || Object.keys(waterMonth).length === 0) return [];

    // Якщо поточний місяць - до сьогодні, попередні - всі дні місяць
    const lastDay = isCurrentMonth
      ? today.getDate()
      : new Date(year, month + 1, 0).getDate(); //останній день попереднього місяця

    return Array.from({ length: lastDay }, (_, i) => {
      const day = (i + 1).toString().padStart(2, '0');
      const formattedDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, '0')}-${day}`; //2025-01-14 string

      return {
        name: day,
        water: waterMonth[formattedDate] || 0,
      };
    });
  }, [waterMonth, month, year, isCurrentMonth]);
  //--

  useEffect(() => {
    setChartData(generateChartData);
  }, [generateChartData]);

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
            dataKey="water"
            stroke="#9BE1A0"
            fill="url(#gradient)"
            dot={{
              r: 5,
              fill: 'transparent',
              stroke: '#9BE1A0',
              strokeWidth: 2,
            }}
            animationDuration={1800} // Плавна анімація
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;

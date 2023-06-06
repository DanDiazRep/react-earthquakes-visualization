'use client'
import React, { useState } from 'react';
import WorldMap from './worldmap';
import useEarthquakeData from './useEarthquakeData';
import YearSlider from './yearSlider';
import MonthSlider from './monthSlider';
import { FilterState } from './types';

const initialState: FilterState = { month: 1, year: 1965 };

const HomePage = () => {
  const eqData = useEarthquakeData();
  const [state, setState] = useState(initialState);

  const handleMonthChange = (newMonth: number) => {
    setState((prevState) => ({ ...prevState, month: newMonth }));
  };

  const handleYearChange = (newYear: number) => {
    setState((prevState) => ({ ...prevState, year: newYear }));
  };

  return (
    <div>
      <YearSlider onChange={handleYearChange} currentYear={state.year} />
      <MonthSlider onChange={handleMonthChange} currentMonth={state.month} />
      <WorldMap earthquakeData={eqData.earthquakeData} selectedMonth={state.month} selectedYear={state.year} />
    </div>
  );
};

export default HomePage;


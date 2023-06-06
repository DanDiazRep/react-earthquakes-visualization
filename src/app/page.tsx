'use client'
import React, { useState } from 'react';
import WorldMap from './worldmap';
import useEarthquakeData from './useEarthquakeData';
import YearSlider from './yearSlider';
import MonthSlider from './monthSlider';
import { FilterState } from './types';
import { EarthquakeData, FilterProps } from "./types";
import LineChart from "./yearLineChart";
import YearLineChart from "./yearLineChart";
import MonthLineChart from "./monthLineChart";
import useCountriesData from './useCountriesData';

const initialState: FilterState = { month: 1, year: 1965 };

const HomePage = () => {
  const [state, setState] = useState(initialState);
  const { earthquakeData, filteredData } = useEarthquakeData(state.month, state.year);
  const { countriesData } = useCountriesData();


  const handleMonthChange = (newMonth: number) => {
    setState((prevState) => ({ ...prevState, month: newMonth }));
  };

  const handleYearChange = (newYear: number) => {
    setState((prevState) => ({ ...prevState, year: newYear }));
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Earthquakes</h1>
      <YearSlider onChange={handleYearChange} currentYear={state.year} />
      <MonthSlider onChange={handleMonthChange} currentMonth={state.month} />
      <WorldMap earthquakeData={filteredData} countryData={countriesData} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <YearLineChart earthquakeData={earthquakeData} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MonthLineChart
          earthquakeData={earthquakeData}
          selectedYear={state.year}
        />
      </div>
    </div>
  );
};

export default HomePage;


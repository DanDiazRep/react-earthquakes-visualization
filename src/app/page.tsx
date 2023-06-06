"use client";
import React, { useState } from "react";
import WorldMap from "./worldmap";
import useEarthquakeData from "./useEarthquakeData";
import YearSlider from "./yearSlider";
import MonthSlider from "./monthSlider";
import { FilterState } from "./types";
import { EarthquakeData, WorldMapProps } from "./types";
import LineChart from "./yearLineChart";
import YearLineChart from "./yearLineChart";
import MonthLineChart from "./monthLineChart";
import ReactSwitch from "react-switch";
import MagnitudeDepthSwitch from "./magnitudeDepthSwitch";

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
      <h1 className="text-4xl text-center">Earthquakes</h1>
      <YearSlider onChange={handleYearChange} currentYear={state.year} />
      <MonthSlider onChange={handleMonthChange} currentMonth={state.month} />
      <WorldMap
        earthquakeData={eqData.earthquakeData}
        selectedMonth={state.month}
        selectedYear={state.year}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <YearLineChart earthquakeData={eqData.earthquakeData} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MonthLineChart
          earthquakeData={eqData.earthquakeData}
          selectedYear={eqData.selectedYear}
        />
      </div>
    </div>
  );
};

export default HomePage;

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

const initialState: FilterState = {
  month: 1,
  year: 1965,
  bubbleOption: "Magnitude",
};

const HomePage = () => {
  const eqData = useEarthquakeData();
  const [state, setState] = useState(initialState);

  const handleMonthChange = (newMonth: number) => {
    setState((prevState) => ({ ...prevState, month: newMonth }));
  };

  const handleYearChange = (newYear: number) => {
    setState((prevState) => ({ ...prevState, year: newYear }));
  };

  const handleBubbleStatechange = (option: string) => {
    setState((prevState) => ({ ...prevState, bubbleOption: option }));
  };

  return (
    <div>
      <h1 className="text-4xl text-center">
        Significant Earthquakes, 1965-2016
      </h1>
      <YearSlider onChange={handleYearChange} currentYear={state.year} />
      <MonthSlider onChange={handleMonthChange} currentMonth={state.month} />
      <MagnitudeDepthSwitch onChange={handleBubbleStatechange} />
      <WorldMap
        earthquakeData={eqData.earthquakeData}
        selectedMonth={state.month}
        selectedYear={state.year}
        bubbleOption={state.bubbleOption}
      />
      {state.bubbleOption === "Depth" ? (
        <p style={{ marginLeft: 50, marginTop: 15 }}>
          Earthquakes can occur anywhere between the Earth's surface and about
          700 kilometers below the surface. For scientific purposes, this
          earthquake depth range of 0 - 700 km is divided into three zones:
          shallow, intermediate, and deep. (Source:
          <a href="https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake#:~:text=Shallow%20earthquakes%20are%20between%200,earthquakes%20deeper%20than%2070%20km.">
            USGS
          </a>
          ) <br />
          In general, earthquakes that occur at greater depths tend to be less
          severe compared to shallow earthquakes, therefore they are shown in
          green.
        </p>
      ) : (
        <div style={{ marginLeft: 50, marginTop: 15 }}>
          <p>
            Magnitude scales can be used to describe earthquakes so small that
            they are expressed in negative numbers. The scale also has no upper
            limit.
          </p>
          <table style={{ marginTop: 15, marginBottom: 10 }}>
            <thead>
              <tr>
                <th>Magnitude</th>
                <th>Earthquake Effects</th>
                <th>Estimated Number Each Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.5 or less</td>
                <td>Usually not felt, but can be recorded by seismograph.</td>
                <td>Millions</td>
              </tr>
              <tr>
                <td>2.5 to 5.4</td>
                <td>Often felt, but only causes minor damage.</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>5.5 to 6.0</td>
                <td>Slight damage to buildings and other structures.</td>
                <td>350</td>
              </tr>
              <tr>
                <td>6.1 to 6.9</td>
                <td>May cause a lot of damage in very populated areas.</td>
                <td>100</td>
              </tr>
              <tr>
                <td>7.0 to 7.9</td>
                <td>Major earthquake. Serious damage.</td>
                <td>10-15</td>
              </tr>
              <tr>
                <td>8.0 or greater</td>
                <td>
                  Great earthquake. Can totally destroy communities near the
                  epicenter.
                </td>
                <td>One every year or two</td>
              </tr>
            </tbody>
          </table>

          <p>
            (Source:{" "}
            <a href="https://www.mtu.edu/geo/community/seismology/learn/earthquake-measure/magnitude/">
              Michigan Tech)
            </a>
          </p>
        </div>
      )}

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
      <p>
        Data set:{" "}
        <a href="https://www.kaggle.com/datasets/usgs/earthquake-database">
          Significant Earthquakes, 1965-2016
        </a>
      </p>
    </div>
  );
};

export default HomePage;

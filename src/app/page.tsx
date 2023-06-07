"use client";
import React, { useState } from "react";
import WorldMap from "./worldmap";
import useEarthquakeData from "./useEarthquakeData";
import YearSlider from "./yearSlider";
import MonthSlider from "./monthSlider";
import { FilterState } from "./types";
import YearLineChart from "./yearLineChart";
import MonthLineChart from "./monthLineChart";
import useCountriesData from "./useCountriesData";
import MagnitudeDepthSwitch from "./magnitudeDepthSwitch";
import MagInfoTable from "./magInfoTable";

const initialState: FilterState = {
  month: 1,
  year: 1965,
  bubbleOption: "Magnitude",
};

const HomePage = () => {
  const [state, setState] = useState(initialState);
  const { earthquakeData, filteredData } = useEarthquakeData(
    state.month,
    state.year
  );
  const { countriesData } = useCountriesData();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      <h1 className="text-4xl text-center" style={{ marginTop: 30 }}>
        Significant Earthquakes, 1965-2016
      </h1>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          marginBottom: 25,
          marginLeft: 100,
          marginRight: 100,
          whiteSpace: "pre-wrap",
        }}
      >
        The data for these visualizations include worldwide earthquakes with a
        <strong> magnitude bigger than 5.5</strong> from 1965 until 2016.
      </p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontStyle: "italic",
          marginTop: 25,
          marginBottom: 25,
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        An earthquake is the sudden release of strain energy in the Earth’s
        crust, resulting in waves of shaking that radiate outwards from the
        earthquake source. When stresses in the crust exceed the strength of the
        rock, it breaks along lines of weakness, either a pre-existing or new
        fault plane. The point where an earthquake starts is termed the focus or
        hypocentre and may be many kilometres deep within the earth. The point
        at the surface directly above the focus is called the earthquake
        epicentre.
      </p>
      <YearSlider onChange={handleYearChange} currentYear={state.year} />
      <MonthSlider onChange={handleMonthChange} currentMonth={state.month} />
      <h2 className="text-2xl text-center" style={{ marginTop: 30 }}>
        {filteredData.length} Earthquakes in {months[state.month]} {state.year}
      </h2>
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
      <MagnitudeDepthSwitch onChange={handleBubbleStatechange} />
      <WorldMap
        earthquakeData={filteredData}
        bubbleOption={state.bubbleOption}
        countryData={countriesData}
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
            Magnitude is the size of the earthquake. (Source:{" "}
            <a href="https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity#:~:text=Magnitude%20is%20the%20size%20of,details%20on%20shaking%20intensity%20measurements.">
              USGS
            </a>
            )
          </p>
          <p>
            Magnitude scales can be used to describe earthquakes so small that
            they are expressed in negative numbers. The scale also has no upper
            limit.
          </p>
          <MagInfoTable />
          <p>
            (Source:{" "}
            <a href="https://www.mtu.edu/geo/community/seismology/learn/earthquake-measure/magnitude/">
              Michigan Tech)
            </a>
          </p>
        </div>
      )}

      <h2 className="text-2xl text-center" style={{ marginTop: 30 }}>
        Trend of Earthquakes from 1965 to 2016 - {earthquakeData.length}{" "}
        Earthquakes
      </h2>
      <h3 className="text-center" style={{ marginTop: 20 }}>
        The number of earthquakes varies every year and there is not a strong
        trend visible.
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <YearLineChart earthquakeData={earthquakeData} />
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

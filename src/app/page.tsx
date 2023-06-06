"use client";

import { useEffect, useState } from "react";
import WorldMap from "./worldmap";
import useEarthquakeData from "./useEarthquakeData";
import { EarthquakeData, WorldMapProps } from "./types";
import LineChart from "./yearLineChart";
import YearLineChart from "./yearLineChart";
import MonthLineChart from "./monthLineChart";

const HomePage = () => {
  const eqData: WorldMapProps = useEarthquakeData();

  useEffect(() => {}, [eqData]);

  return (
    <div>
      <h1>Earthquakes</h1>
      {eqData.earthquakeData.length > 0 && (
        <div>
          <p>
            {eqData.earthquakeData.length} earthquakes recorded between{" "}
            {eqData.earthquakeData[0].year} and{" "}
            {eqData.earthquakeData[eqData.earthquakeData.length - 1].year}
          </p>
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
          <WorldMap
            earthquakeData={eqData.earthquakeData}
            selectedMonth={eqData.selectedMonth}
            bubbleOption={eqData.bubbleOption}
            selectedYear={eqData.selectedYear}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;

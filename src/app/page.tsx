'use client';

import { useEffect, useState } from 'react';
import WorldMap from './worldmap';
import useEarthquakeData from './useEarthquakeData';
import { EarthquakeData, WorldMapProps } from './types';

const HomePage = () => {
  const eqData: WorldMapProps = useEarthquakeData();

  useEffect(() => {
  }, [eqData]);

  return (
    <div>
      <h1>Earthquakes</h1>
      {eqData.earthquakeData.length > 0 && (
        <div>
          <p>
            {eqData.earthquakeData.length} earthquakes recorded in{' '}
            {eqData.earthquakeData[0].year}
          </p>
          <WorldMap earthquakeData={eqData.earthquakeData} selectedMonth={eqData.selectedMonth} bubbleOption={eqData.bubbleOption} selectedYear={eqData.selectedYear} />
        </div>
      )}

    </div>
  );
};

export default HomePage;

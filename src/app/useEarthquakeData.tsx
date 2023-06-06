import { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { EarthquakeData, WorldMapProps } from './types';

const useEarthquakeData = (): WorldMapProps => {
    const [eqData, setEqData] = useState<EarthquakeData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState({ month: 0, amount: 0 });
    const [bubbleOption, setBubbleOption] = useState('Magnitude');

    useEffect(() => {
        const fetchEarthquakeData = async () => {
            try {
                const response = await fetch('/earthquake_data.csv');
                const data = await response.text();

                const { data: parsedData } = parse(data, { header: true });

                const filteredData: EarthquakeData[] = parsedData
                    .map((element: any) => ({
                        country: element.country,
                        continent: element.continent,
                        date: element.Date,
                        longitude: parseFloat(element.Longitude),
                        latitude: parseFloat(element.Latitude),
                        magnitude: parseFloat(element.Magnitude),
                        depth: parseFloat(element.Depth),
                        year: new Date(element.Date).getFullYear(),
                        month: new Date(element.Date).getMonth(),
                    }))
                    .filter((d) => !isNaN(d.year));

                setEqData(filteredData);
            } catch (error) {
                console.error('Error loading earthquake data:', error);
            }
        };

        fetchEarthquakeData();
    }, []);

    return { earthquakeData: eqData, selectedMonth, bubbleOption, selectedYear: 1981 };
};

export default useEarthquakeData;








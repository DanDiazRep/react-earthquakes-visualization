import { useMemo, useState } from "react";
import { parse } from "papaparse";
import { EarthquakeData, FilterProps } from "../app/types/types";

const useEarthquakeData = (
    selectedMonth: number,
    selectedYear: number
): FilterProps => {
    const [eqData, setEqData] = useState<EarthquakeData[]>([]);
    const [eqFilteredData, setFilteredEqData] = useState<EarthquakeData[]>([]);

    useMemo(() => {
        const fetchEarthquakeData = async () => {
            try {
                const response = await fetch('/earthquake_data.csv');
                const data = await response.text();

                const { data: parsedData } = parse(data, { header: true });

                const filteredData: EarthquakeData[] = parsedData
                    .map((element: any) => ({
                        country: element.country,
                        continent: element.continent
                            ? element.continent
                            : element.country === "Cape Verde"
                                ? "Africa"
                                : "",
                        date: element.Date,
                        longitude: parseFloat(element.Longitude),
                        latitude: parseFloat(element.Latitude),
                        magnitude: parseFloat(element.Magnitude),
                        depth: parseFloat(element.Depth),
                        year: new Date(element.Date).getFullYear(),
                        month: new Date(element.Date).getMonth(),
                    }))
                    .filter(
                        (d) =>
                            !isNaN(d.year) &&
                            !isNaN(d.month) &&
                            !isNaN(d.magnitude) &&
                            !isNaN(d.depth) &&
                            !isNaN(d.longitude) &&
                            !isNaN(d.latitude)
                    );

                setEqData(filteredData);
            } catch (error) {
                console.error("Error loading earthquake data:", error);
            }
        };

        fetchEarthquakeData();
    }, []);

    const filteredData = useMemo(() => {
        // Filter data by selected month and year
        console.log("filteredData");
        setFilteredEqData(
            eqData.filter((d) => d.month === selectedMonth && d.year === selectedYear)
        );
        return eqFilteredData;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth, selectedYear, eqData]);

    return { earthquakeData: eqData, filteredData: eqFilteredData };
};

export default useEarthquakeData;

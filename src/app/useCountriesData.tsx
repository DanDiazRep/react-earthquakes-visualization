import { useEffect, useMemo, useState } from 'react';
import { Topology } from 'topojson-specification';

const useCountriesData = () => {

    const [countriesData, setCountriesData] = useState<Topology>({} as Topology);

    useMemo(() => {
        const fetchCountriesData = async () => {
            try {
                const response = await fetch('/countries-50m.json');
                const data: Topology = await response.json();
                setCountriesData(data);
            } catch (error) {
                console.error('Error loading countries data:', error);
                setCountriesData({} as Topology);
            }
        };
        fetchCountriesData();
    }, []);

    return { countriesData };
}

export default useCountriesData;
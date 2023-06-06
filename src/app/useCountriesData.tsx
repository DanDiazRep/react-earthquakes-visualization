import { useEffect, useMemo, useState } from 'react';
import { Topology } from 'topojson-specification';

const useCountriesData = () => {

    const [countriesData, setCountriesData] = useState<Topology>({} as Topology);

    useMemo(() => {
        const fetchCountriesData = async () => {
            try {
                const response = await fetch('https://unpkg.com/world-atlas@2/countries-110m.json');
                const data: Topology = await response.json();
                setCountriesData(data);
                console.log('countriesData', data);
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
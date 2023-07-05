import { useEffect, useMemo, useState } from 'react';
import { FeatureCollection } from 'geojson';

const useTectonicPlatesData = () => {

    const [tectonicData, setTectonicData] = useState<FeatureCollection>({} as FeatureCollection);

    useMemo(() => {
        const fetchCountriesData = async () => {
            try {
                const response = await fetch('/tectonicplates.json');
                const data: FeatureCollection = await response.json();
                setTectonicData(data);
            } catch (error) {
                console.error('Error loading countries data:', error);
                setTectonicData({} as FeatureCollection);
            }
        };
        fetchCountriesData();
    }, []);

    return { tectonicData };
}

export default useTectonicPlatesData;
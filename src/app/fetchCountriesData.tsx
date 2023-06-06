import { Topology } from 'topojson-specification';

const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://unpkg.com/world-atlas@2/countries-110m.json');
        const data: Topology = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading countries data:', error);
        return {} as Topology;
    }
}

export default fetchCountriesData;
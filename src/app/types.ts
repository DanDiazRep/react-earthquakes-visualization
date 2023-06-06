import { ValueFn } from 'd3';

export interface EarthquakeData {
    country: string;
    continent: string;
    date: string;
    longitude: number;
    latitude: number;
    magnitude: number;
    depth: number;
    year: number;
    month: number;
}

export interface EarthquakesByMonth {
    month: number;
    amount: number;
}

export interface EarthquakesByYear {
    year: number;
    amount: number;
}

export interface FilterState {
    month: number;
    year: number;
    bubbleOption: string;
}

export interface WorldMapProps {
    earthquakeData: EarthquakeData[];
    selectedMonth: number;
    selectedYear: number;
    bubbleOption?: string;
}

export interface YearLineChartProps {
    earthquakeData: EarthquakeData[];
}

export interface MonthLineChartProps {
    earthquakeData: EarthquakeData[];
    selectedYear: number;
}

export interface MagnitudeDepthSwitchProps {
    onChange: (value: string) => void;
}

export interface LegendBubbleProps {
    color: string;
    value: string;
}

interface arc {
    [index: number]: number[];
}

export interface GeoData {
    //TODO map the geojson data
}

export interface contriesData {
    arcs: arc[];
    bbox: number[];
    objects: {
        countries: {
            geometries: {
                arcs: arc[];
                id: number;
                properties: {
                    name: string;
                };
                type: string;
            }[];
            type: string;
        };
        land: {
            geometries: {

            };
            transform: {
                scale: number[];
                translate: number[];
            };
            type: string;
        }
    };
}

// d3 types only
export type GeoPathValueFn = ValueFn<SVGPathElement, unknown, string | number | boolean | readonly (string | number)[] | null>;
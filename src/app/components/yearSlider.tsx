import { NumberValue } from 'd3';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { use, useEffect, useState } from 'react';

interface YearSliderProps {
    onChange: (value: number) => void;
    currentYear: number;
}
const YearSlider = (props: YearSliderProps) => {
    const [year, setYear] = useState<number>(props.currentYear);

    useEffect(() => {
        props.onChange(year);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <div className='h-10 flex place-items-center'>
            <div className='p-10 w-full'>
                <Slider
                    min={1965}
                    max={2016}
                    defaultValue={1965}
                    marks={{ 1965: '1965', 1970: '1970', 1975: '1975', 1980: '1980', 1985: '1985', 1990: '1990', 1995: '1995', 2000: '2000', 2005: '2005', 2010: '2010', 2016: '2016' }}
                    step={1}
                    trackStyle={{ backgroundColor: '#ccc', height: 2 }}
                    handleStyle={{
                        borderColor: '#44ff44',
                        //height: 30,
                        //width: 30,
                        //marginTop: -14,
                        backgroundColor: '#44ff44',
                    }}
                    railStyle={{ backgroundColor: '#ccc', height: 2 }}
                    onChange={(value) => {
                        setYear(value as number);
                    }
                    }

                />
            </div>
        </div>
    );
}

export default YearSlider;
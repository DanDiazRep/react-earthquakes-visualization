import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { use, useEffect, useState } from 'react';

interface MonthSliderProps {
    onChange: (value: number) => void;
    currentMonth: number;
}

const MonthSlider = (props: MonthSliderProps) => {
    const [month, setMonth] = useState<number>(props.currentMonth);


    useEffect(() => {
        props.onChange(month);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    return (
        <div className='h-10 flex place-items-center'>
            <div className='p-10 w-full'>
                <Slider
                    min={0}
                    max={11}
                    defaultValue={0}
                    marks={{ 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'June', 6: 'July', 7: 'Aug', 8: 'Sept', 9: 'Oct', 10: 'Nov', 11: 'Dec' }}
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
                        setMonth(value as number);
                    }
                    }
                />
            </div>
        </div>
    );
}

export default MonthSlider;
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
//@ts-ignore
import { RadialGauge } from 'react-canvas-gauges';


function CanvasTemp(temperature: { temperature: any; }) {
    // const [temperature, setTemperature] = useState(0);

    // useEffect(() => {
    //     const newLimit = () => {
    //         return Math.random() * 50;
    //     };

    //     let limit = newLimit();
    //     let currentTemp = 0,
    //         directionUp = true;

    //     const interval = setInterval(() => {
    //         currentTemp = directionUp ? currentTemp + 1 : currentTemp - 1;

    //         if (
    //             (currentTemp >= limit && directionUp) ||
    //             (currentTemp <= limit && !directionUp)
    //         ) {
    //             let nextLimit = newLimit();
    //             if (nextLimit < currentTemp) {
    //                 directionUp = false;
    //             } else {
    //                 directionUp = true;
    //             }
    //         }

    //         setTemperature(currentTemp);
    //     }, 200);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    if (typeof window === 'undefined') {
        // Return a placeholder or null if running on the server
        return null;
    }

    return (
        <div>
            <RadialGauge
                units="°C"
                title="Temperature"
                value={temperature.temperature}
                minValue={0}
                maxValue={100}
                majorTicks={['0', '15', '30', '45', '60', '75', '90', '105', '120', '140']}
                minorTicks={2}
                width={400} // Increase the width to increase the radius size
                height={400} // Increase the height to increase the radius size
            />
        </div>
    );
}

export default CanvasTemp;

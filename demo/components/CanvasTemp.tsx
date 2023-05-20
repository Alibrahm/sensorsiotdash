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
                colorMajorTicks="#ddd"
                colorMinorTicks="#ddd"
                colorTitle="#eee"
                colorUnits="#ccc"
                colorNumbers="#eee"
                colorPlate="#222"
                borderShadowWidth='0'
                borders='true'
                needleType="arrow"
                needleWidth='2'
                needleCircleSize='7'
                needleCircleOuter='true'
                needleCircleInner='false'
                animationDuration='1500'
                animationRule="linear"
                colorBorderOuter="#333"
                colorBorderOuterEnd="#111"
                colorBorderMiddle="#222"
                colorBorderMiddleEnd= "#111"
                colorBorderInner= "#111"
                colorBorderInnerEnd= "#333"
                colorNeedleShadowDown= "#333"
                colorNeedleCircleOuter="#333"
                colorNeedleCircleOuterEnd= "#111"
                colorNeedleCircleInner= "#111"
                colorNeedleCircleInnerEnd= "#222"
                valueBoxBorderRadius='2'
                colorValueBoxRect="#222"
            colorValueBoxRectEnd= "#333"
            />
        </div>
    );
}

export default CanvasTemp;

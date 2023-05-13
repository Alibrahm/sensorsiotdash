import React from "react";
//@ts-ignore
import Thermometer from "react-thermometer-chart";


export default function ThermometerThree(temperature: any) {
    console.log("temperature rpobe prop",temperature)
    return (
        <div>
            <Thermometer
                width="100px"
                height="250px"
                steps={5}
                minValue={0}
                maxValue={100}
                currentValue={temperature.temperature}
                color="red"
                reverseGradient={true}
            />
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import axios from 'axios';

const RealTimeDataChart = () => {
    const [realTimeData, setRealTimeData] = useState([10,24,34,67]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios
                .get('https://watersensorsapi.herokuapp.com/api/sensors?sensor_id=collection3')
                .then((response) => {
                    const temperatureData = response.data[0].temperature;
                    //@ts-ignore
                    setRealTimeData((prevData) => [...prevData, response.data[0].turbidity]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Sparklines data={realTimeData}>
            <text x={70} y={12} style={{ fill: 'black' }}>Turbidity</text>
            <SparklinesBars style={{ stroke: 'white', fill: '#40c0f5' }} />
        </Sparklines>
    );
};

export default RealTimeDataChart;

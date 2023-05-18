import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import axios from 'axios';

const RealTimeDataChart = () => {
    const [realTimeData, setRealTimeData] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios
                .get('https://watersensorsapi.herokuapp.com/api/sensors?sensor_id=collection3')
                .then((response) => {
                    const temperatureData = response.data[0].temperature;
                    //@ts-ignore
                    setRealTimeData((prevData) => [...prevData, response.data[0].temperature]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Sparklines data={realTimeData} style={{ background: "#00bdcc" }} margin={10} height={70}>
            <SparklinesLine style={{ stroke: "white", fill: "none" }} />
            <SparklinesSpots />
            <SparklinesReferenceLine
                style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
        </Sparklines>
    );
};

export default RealTimeDataChart;

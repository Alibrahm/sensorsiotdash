import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import axios from 'axios';

const RealTimeDataChart = () => {
    const [realTimeData, setRealTimeData] = useState([23,25,29]);

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
        <Sparklines data={realTimeData} style={{ background: "#272727" }} margin={10} height={40}>
            {/* <SparklinesLine color="blue" width={2} style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} /> */}
            <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
            <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
            <SparklinesReferenceLine type="mean" />
        </Sparklines>
    );
};

export default RealTimeDataChart;

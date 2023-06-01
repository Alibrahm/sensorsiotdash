import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function getRandomNumber() {
    return Math.random() * 100;
}

export function getData() {
    return [
        ["Label", "Value"],
        ["Memory", getRandomNumber()],
        ["CPU", getRandomNumber()],
        ["Network", getRandomNumber()],
    ];
}

export const options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
};

const styles = {
    dial: {
        width: `auto`,
        height: `auto`,
        color: "#000",
        // border: "0.5px solid #fff",
        paddingTop: "88px",
        marginInline:'-48px'
    },
    title: {
        fontSize: "1em",
        color: "#000"
    }
};

const Tds = ({ value, title }: any) => {
    const radius = 160;
    return (
        <div style={styles.dial}>
            <Chart
                width={radius * 2}
                height={radius * 2}
                chartType="Gauge"
                loader={<div></div>}
                data={[
                    ["Label", "Value"],
                    [title, Number(value)]
                ]}
                options={{
                    redFrom: 90,
                    redTo: 200,
                    yellowFrom: 50,
                    yellowTo: 90,
                    minorTicks: 5,
                    min: 0,
                    max: 'auto'
                }}
            />
        </div>
    );
};

export default Tds;



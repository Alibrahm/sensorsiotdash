import React from "react";
import ReactSpeedometer from "react-d3-speedometer"

const styles = {
    dial: {
        display: "inline-block",
        width: `300px`,
        height: `auto`,
        color: "#000",
        border: "0.5px solid #fff",
        padding: "2px"
    },
    title: {
        fontSize: "1em",
        color: "#000"
    }
};

const Phmeter = ({ id, value, title }) => {
    return (
        <div style={styles.dial}>
            <ReactSpeedometer
                maxValue={120}
                minValue={-10}
                height={280}
                width={290}
                value={value}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
            />
            <div style={styles.title}>{title}</div>
        </div>
    );
};

export default Phmeter;

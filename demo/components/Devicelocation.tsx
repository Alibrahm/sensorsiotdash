import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';



const position = [51.505, -0.09];
const mapStyle = { height: "100vh" };
//TO add dynamic locations here later
export const data = [
    { name: "Nairobi", position: [1.2264685, 36.7496256] },
    // { name: "Mombasa", position: [1.2271699, 36.7485256] },
    // { name: "Kisumu", position: [-0.1022, 34.7617] },
];

// const icon = L.icon({
//     iconUrl:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/564px-Map_pin_icon.svg.png",
//     iconSize: [32, 32],
//     iconAnchor: [16, 16],
// });

const DynamicMap = dynamic(
    () => import("../components/Map"), // path to your Map component
    { ssr: false }
);

export default function Devicelocation() {
    const [map, setMap] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);

    return (
        <>
            <DynamicMap
                center={[1.2264685, 36.7496256]}
                zoom={8}
                style={{ height: "400px", width: "100%" }}
                data={data}
                setSelectedCounty={setSelectedCounty}
                selectedCounty={selectedCounty}
            />
        </>
    );
}

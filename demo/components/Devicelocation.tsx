import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';



const position = [51.505, -0.09];
const mapStyle = { height: "100vh" };
//TO add dynamic locations here later
// export const data = [
//     { name: "Nairobi", position: [1.2264685, 36.7496256] },
//     // { name: "Mombasa", position: [1.2271699, 36.7485256] },
//     // { name: "Kisumu", position: [-0.1022, 34.7617] },
// ];


const DynamicMap = dynamic(
    () => import("../components/Map"), // path to your Map component
    { ssr: false }
);

export default function Devicelocation(latitude: any, longitude: any) {
    const [map, setMap] = useState(null);
    console.log("Child props location", latitude.latitude)
    const [selectedCounty, setSelectedCounty] = useState(null);

    const data = [
        { name: "Nairobi", position: [latitude.latitude, latitude.longitude] },
        // { name: "Mombasa", position: [1.2271699, 36.7485256] },
        // { name: "Kisumu", position: [-0.1022, 34.7617] },
    ];

    return (
        <>
            <DynamicMap
                center={[latitude.latitude, latitude.longitude]}
                zoom={8}
                style={{ height: "400px", width: "100%", border: '1px solid lightgray', borderRadius: '15px' }}
                data={data}
                setSelectedCounty={setSelectedCounty}
                selectedCounty={selectedCounty}
            />
        </>
    );
}

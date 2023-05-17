import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from "react";
import L from "leaflet";
export default function Map({ center, zoom, style, data, setSelectedCounty, selectedCounty }: any) {
    const icon = L.icon({
    iconUrl:
        "https://cdn.shopify.com/s/files/1/2129/3747/t/22/assets/pf-6946df78--Location-icon.png?v=1584271085",
    iconSize: [70, 60],
    iconAnchor: [16, 16],
});
    
    return (
        <div style={style}>
            {/* @ts-ignore */}
            <MapContainer center={center} zoom={zoom} style={style}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    //@ts-ignore
                    attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap </a> '
                />
                {data.map((county: { name: boolean | Key | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined; position: any; }) => (
                    <Marker
                    //@ts-ignore
                        key={county.name}
                        position={county.position}
                        eventHandlers={{
                            click: () => {
                                setSelectedCounty(county);
                            },
                        }}
                        icon= {icon}
                    >
                        <Popup>{county.name}</Popup>
                    </Marker>
                ))}
                
                {selectedCounty && (
                    <Popup position={selectedCounty.position} >
                        <div>{selectedCounty.name}</div>
                    </Popup>
                )}
            </MapContainer>
        </div>
    );
}

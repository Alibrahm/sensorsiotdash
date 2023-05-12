import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function Map({ center, zoom, style, data, setSelectedCounty, selectedCounty }) {
    return (
        <div style={style}>
            <MapContainer center={center} zoom={zoom} style={style}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> '
                />
                {data.map((county) => (
                    <Marker
                        key={county.name}
                        position={county.position}
                        eventHandlers={{
                            click: () => {
                                setSelectedCounty(county);
                            },
                        }}
                    >
                        <Popup>{county.name}</Popup>
                    </Marker>
                ))}
                {selectedCounty && (
                    <Popup position={selectedCounty.position} onClose={() => setSelectedCounty(null)}>
                        <div>{selectedCounty.name}</div>
                    </Popup>
                )}
            </MapContainer>
        </div>
    );
}

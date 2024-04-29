import markerIcon from '../../assets/icons/markerIcon.png';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = (props) => {
    const coordinates = [props.coordinates[0].latitude, props.coordinates[0].longitude];

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [35, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon (bottom center)
        popupAnchor: [0, -41] // Popup anchor relative to the icon
    });

    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates} icon={customMarkerIcon}>
                <Popup>
                    <strong>{props.tour}</strong> <br />
                    lat: {coordinates[0]}°N <br />
                    long: {coordinates[1]}°E
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default LeafletMap;

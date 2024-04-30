import markerIcon from '../../assets/icons/markerIcon.png';
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = (props) => {
    const coordinates = [props.coordinates[0].latitude, props.coordinates[0].longitude];
    const mapRef = useRef(null);

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [41, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon (bottom center)
        popupAnchor: [0, -41] // Popup anchor relative to the icon
    });

    useEffect(() => {
        // Programmatically open the marker's popup when the map loads
        const map = mapRef.current; // Get the Leaflet map instance
        const marker = map?.layers.getLayers()[0]; // Get the first marker on the map

        if (marker) {
            marker.openPopup(); // Open the popup associated with the marker
        }
    }, [mapRef.current]); // Run this effect only once after initial render

    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} style={{ height: '700px', width: '100%' }}>
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

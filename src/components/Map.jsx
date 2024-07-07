import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import personalIconUrl from '../assets/images/Personal.png';
import professionalIconUrl from '../assets/images/Professional.png';
import educationalIconUrl from '../assets/images/Education.png';
import '../sass/styles.scss';

// Define icons
const personalIcon = new L.Icon({
    iconUrl: personalIconUrl,
    iconSize: [30, 30],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const professionalIcon = new L.Icon({
    iconUrl: professionalIconUrl,
    iconSize: [30, 30],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const educationalIcon = new L.Icon({
    iconUrl: educationalIconUrl,
    iconSize: [30, 30],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map = ({ center, zoom, markers }) => {
    const mapRef = useRef(null);
    const initialViewRef = useRef({ center, zoom });
    const [buttonText, setButtonText] = useState('Zoom To');

    useEffect(() => {
        if (!center || !zoom || !markers) {
            console.error('Missing center, zoom, or markers');
            return;
        }

        // Initialize the map
        const map = L.map('map').setView([center.latitude, center.longitude], zoom);
        mapRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Add markers with icons and popups
        markers.forEach(marker => {
            let icon;
            switch (marker.location_type) {
                case 'Personal':
                    icon = personalIcon;
                    break;
                case 'Professional':
                    icon = professionalIcon;
                    break;
                case 'Educational':
                    icon = educationalIcon;
                    break;
                default:
                    icon = L.Icon.Default;
            }

            const markerInstance = L.marker([marker.latitude, marker.longitude], { icon })
                .addTo(map)
                .bindPopup(`
                    <p class="map-marker-description">${marker.description}</p><br>
                    <p>${marker.explanation || ''}</p>
                    <br><button class="button primary zoom-to-btn" data-lat="${marker.latitude}" data-lng="${marker.longitude}">${buttonText}</button>
                `);

            // Attach an event listener when the popup is opened
            markerInstance.on('popupopen', function (e) {
                const popup = e.popup;
                const popupContent = popup.getElement();
                const button = popupContent.querySelector('.zoom-to-btn');
                if (button) {
                    button.addEventListener('click', function () {
                        const lat = parseFloat(button.getAttribute('data-lat'));
                        const lng = parseFloat(button.getAttribute('data-lng'));
                        if (mapRef.current) {
                            if (button.textContent === 'Zoom To') {
                                mapRef.current.setView([lat, lng], 12);
                                button.textContent = 'Back Home';
                            } else {
                                mapRef.current.setView(
                                    [initialViewRef.current.center.latitude, initialViewRef.current.center.longitude],
                                    initialViewRef.current.zoom
                                );
                                button.textContent = 'Zoom To';
                            }
                        }
                    });
                } else {
                    console.error('Button not found in popup content');
                }
            });
        });

        // Cleanup function when component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center, zoom, markers, buttonText]);

    // Render the map container
    return <div id="map" className="life-map"></div>;
};

export default Map;

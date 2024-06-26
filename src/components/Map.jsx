import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import personalIconUrl from '../assets/images/Personal.png';
import professionalIconUrl from '../assets/images/Professional.png';
import educationalIconUrl from '../assets/images/Education.png';

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

        // Add markers with icons
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
                    <b>${marker.description}</b><br>
                    ${marker.explanation || ''}
                    <br><button class="zoom-to-btn" data-lat="${marker.latitude}" data-lng="${marker.longitude}">Zoom To</button>
                `);

            markerInstance.on('popupopen', function() {
                const button = document.querySelector('.zoom-to-btn');
                if (button) {
                    button.addEventListener('click', function() {
                        const lat = parseFloat(button.getAttribute('data-lat'));
                        const lng = parseFloat(button.getAttribute('data-lng'));
                        if (mapRef.current) {
                            mapRef.current.setView([lat, lng], 14); // Adjust zoom level as needed
                        }
                        button.textContent = 'Back to Home';
                        button.classList.remove('zoom-to-btn');
                        button.classList.add('back-home-btn');
                    });
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
    }, [center, zoom, markers]);

    // Event listener for Back to Home button
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const handleBackToHome = (e) => {
            if (e.target.classList.contains('back-home-btn')) {
                map.setView(
                    [initialViewRef.current.center.latitude, initialViewRef.current.center.longitude],
                    initialViewRef.current.zoom
                );
            }
        };

        // Add event listener to document for back-home-btn
        document.addEventListener('click', handleBackToHome);

        // Cleanup function for event listener
        return () => {
            document.removeEventListener('click', handleBackToHome);
        };
    }, []);

    // Render the map container
    return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default Map;

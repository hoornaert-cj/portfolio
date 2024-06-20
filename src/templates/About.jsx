import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import Map from '../components/Map';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const About = () => {
    const restPath = `${restBase}pages/63?acf_format=standard`;
    const [restData, setRestData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    setRestData(data);
                    setIsLoaded(true);
                } else {
                    setIsLoaded(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoaded(false);
            }
        };

        fetchData();
    }, [restPath]);

    if (!isLoaded) {
        return <Loading />;
    }

    const { acf } = restData;
    const { avatar_image, about_intro, interesting_facts, about_map_title, about_map_latitude, about_map_longitude, about_map_zoom, about_map_markers } = acf || {};

    return (
        <div className='about-wrapper'>
            <section className='about-content'>
            <section className="about-intro">
                {avatar_image && (
                    <img
                        src={avatar_image.url}
                        alt={avatar_image.alt}
                    />
                )}
                <section className='about-intro-text'>
                <h1>About Me</h1>
                <div dangerouslySetInnerHTML={{ __html: about_intro }}></div>
                </section>
            </section>
            <section className='accordion-section'>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Personal Facts</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            <ul>
                                {interesting_facts && interesting_facts
                                    .filter(fact => fact.facts_type === 'Personal')
                                    .map((fact, index) => (
                                        <li key={index}>{fact.fact_description}</li>
                                    ))}
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <Typography>Professional Facts</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            <ul>
                                {interesting_facts && interesting_facts
                                    .filter(fact => fact.facts_type === 'Professional')
                                    .map((fact, index) => (
                                        <li key={index}>{fact.fact_description}</li>
                                    ))}
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </section>
            <section className='map-section'>
                <h2>{about_map_title}</h2>
                <Map
                    center={{
                        latitude: parseFloat(about_map_latitude),
                        longitude: parseFloat(about_map_longitude)
                    }}
                    zoom={parseInt(about_map_zoom)}
                    markers={about_map_markers && about_map_markers.map(marker => ({
                        latitude: parseFloat(marker.marker_latitude),
                        longitude: parseFloat(marker.marker_longitude),
                        description: marker.marker_description,
                        explanation: marker.marker_explanation,
                        location_type: marker.location_type
                    }))}
                />
            </section>
            <section>
                <button onClick={() => window.location.href='/projects'}>View Projects</button>
                <button onClick={() => window.location.href='/about'}>Learn More About Me</button>
            </section>
            </section>
        </div>
    );
};

export default About;

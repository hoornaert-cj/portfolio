import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';

const Home = () => {
    const restPath = `${restBase}pages/9/?acf_format=standard`;
    const [restData, setRestData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setRestData(data);
                setLoadStatus(true);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoadStatus(true); // Set to true to display the error message
            }
        };

        fetchData();
    }, [restPath]);

    if (!isLoaded) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">Error fetching data: {error.message}</div>;
    }

    // Log restData to ensure it has the expected structure
    console.log('restData:', restData);

    // Check if restData and restData.acf exist before accessing properties
    if (!restData || !restData.acf) {
        return <div className="error-message">Invalid data structure</div>;
    }

    return (
        <section id={`post-${restData.id}`}>
            <div className="entry-content">
                <section className="home-header">
                    {restData.acf.home_heading_image && (
                        <img
                            src={restData.acf.home_heading_image.url}
                            alt={restData.acf.home_heading_image.alt}
                            width="500px"
                            height="300px"
                        />
                    )}
                    <h2>{restData.acf.home_name}</h2>
                    <p className="home-intro">{restData.acf.home_intro}</p>
                </section>
                <section className='home-call-to-action'>
                    {restData.acf['home_call-to-action_image_1'] && (
                        <img
                            src={restData.acf['home_call-to-action_image_1'].url}
                            alt={restData.acf['home_call-to-action_image_1'].alt}
                            width="300px"
                        />
                    )}
                    <p>{restData.acf['home_call-to-action_text']}</p>
                    {restData.acf.global_buttons && (
                        <GlobalButtons buttons={restData.acf.global_buttons} />
                    )}
                    {restData.acf['home_call-to-action_image_2'] && (
                        <img
                            src={restData.acf['home_call-to-action_image_2'].url}
                            alt={restData.acf['home_call-to-action_image_2'].alt}
                            width="300px"
                        />
                    )}
                </section>
            </div>
        </section>
    );
};

export default Home;

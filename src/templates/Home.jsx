import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';

const Home = () => {
    const restPath = restBase + 'pages/9';
    const [restData, setRestData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    setRestData(data);
                    setLoadStatus(true);
                } else {
                    setLoadStatus(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadStatus(false);
            }
        };

        fetchData();
    }, [restPath]);

    console.log(restData); // Log the entire restData object

    return (
        <>
            {isLoaded ? (
                <article id={`post-${restData.id}`}>
                    {/* <h1>{restData.title.rendered}</h1> */}
                    <div className="entry-content">
                        <section className="home-header">
                            {restData.acf && restData.acf.home_header_image && (
                                <img
                                    src={restData.acf.home_header_image.url}
                                    alt={restData.acfhome_header_image.alt}
                                    width="500px"
                                    height="300px"
                                />
                            )}
                        </section>
                        {/* <h2>{restData.acf.home_name}</h2> */}
                    </div>
                </article>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;

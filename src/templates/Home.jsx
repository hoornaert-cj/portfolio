import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';

const Home = () => {
    const restPath = restBase + 'pages/9';
    // const optionsRestPath = restBase + 'acf/v3/options/global-buttons';
    const [restData, setRestData] = useState([]);
    // const [globalOptions, setGlobalOptions] = useState({});
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
    // console.log(globalOptions);

    return (
        <>
            {isLoaded ? (
                 <article id={`post-${restData.id}`}>
                 <div className="entry-content">
                     <section className="home-header">
                         {restData.acf && restData.acf.home_heading_image && (
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
                 </div>
             </article>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;

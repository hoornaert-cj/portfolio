// Home.jsx
import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';
import '../sass/pages/_home.scss';


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
          setLoadStatus(true);
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

    if (!restData || !restData.acf) {
      return <div className="error-message">Invalid data structure</div>;
    }

    return (
        <main id="main" style={{ position: 'relative' }}>
          <div className="gradient-background"></div>
          <div className="home-container">
            <section id="post-9">
              <div className="entry-content">
                <section className="home-header">
                  <img
                    src="https://chrishoornaert.com/securepanel/wp-content/uploads/2024/06/attractions_casa-loma.jpg"
                    alt="Casa Loma"
                    width="500px"
                    height="300px"
                  />
                  <h2>Chris Hoornaert</h2>
                  <p className="home-intro">
                    Welcome to my portfolio! I am a recent front-end web
                    development graduate with years of experience in Geographic
                    Information Systems (GIS). Dive into my projects to see how I
                    blend creativity with technical skills, and don't hesitate to
                    explore more about my journey and expertise.
                  </p>
                </section>
                <section className="home-call-to-action">
                  <img
                    src="https://chrishoornaert.com/securepanel/wp-content/uploads/2024/06/Movie-Database-Favourites.jpg"
                    alt="Movie Database Favourites Page"
                    width="300px"
                  />
                  <p>Learn more about me and my work. Click below.</p>
                  <div className="global-buttons">
                    <a
                      href="https://chrishoornaert.com/projects"
                      target="_self"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Projects
                    </a>
                    <a
                      href="https://chrishoornaert.com/about"
                      target="_self"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      About
                    </a>
                  </div>
                  <img
                    src="https://chrishoornaert.com/securepanel/wp-content/uploads/2024/06/Me_Sadie_small.jpg"
                    alt="Man and a red dog."
                    width="300px"
                  />
                </section>
              </div>
            </section>
          </div>
        </main>
      );
    };

    export default Home;

import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import GlobalButtons from "../components/GlobalButtons";
import "../sass/pages/_home.scss";

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
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setRestData(data);
        setLoadStatus(true);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    return (
      <div className="error-message">Error fetching data: {error.message}</div>
    );
  }

  if (!restData || !restData.acf) {
    return <div className="error-message">Invalid data structure</div>;
  }

  const { acf } = restData;

  return (
    <main id="main" className="main-home" style={{ position: "relative" }}>
      <Helmet>
  <title>{acf.home_name} - Your Portfolio</title>
  <meta name="description" content={acf.home_intro} />
  <meta name="keywords" content="portfolio, web development, projects" />
  <link rel="canonical" href="https://www.chrishoornaert.com/" />
  {/* <script type="application/ld+json">
    {JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Person",
      name: acf.home_name,
      url: "https://www.chrishoornaert.com",
      sameAs: [
        "https://www.linkedin.com/in/christopher-hoornaert/",
        "https://github.com/hoornaert-cj"
      ],
      jobTitle: "Web Developer/GIS Specialist"
    })}
  </script> */}
</Helmet>
      <div className="home-wrapper">
        <section className="home-content">
          <section className="home-header">
            {acf.home_heading_image && (
              <img
                src={acf.home_heading_image.url}
                alt={acf.home_heading_image.alt}
              />
            )}
          </section>
          <section className="home-intro">
            <section className="home-intro-text">
              <h1>{acf.home_name}</h1>
              <p>{acf.home_intro}</p>
              {acf.global_buttons && (
                <GlobalButtons buttons={acf.global_buttons} />
              )}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Home;

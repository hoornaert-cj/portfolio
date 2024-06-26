// Home.jsx
import React, { useState, useEffect } from "react";
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
            `Network response was not ok: ${response.statusText}`,
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
    <main id="main" style={{ position: "relative" }}>
      <div className="home-wrapper">
        <section className="home-content">
              <section className="home-header">
                {restData.acf.home_heading_image && (
                  <img
                    src={restData.acf.home_heading_image.url}
                    alt={restData.acf.home_heading_image.alt}
                  />
                )}
              </section>
                <section className='home-intro'>
                  <section className="home-intro-text">
                <h1>{restData.acf.home_name}</h1>
                <p className>{restData.acf.home_intro}</p>
                {restData.acf.global_buttons && (
                  <GlobalButtons buttons={restData.acf.global_buttons} />
                )}
                  </section>

                </section>


        </section>
      </div>
    </main>
  );
};

export default Home;

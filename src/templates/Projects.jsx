import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';

const Projects = () => {
  const restPath = restBase + 'pages/51';
  const [restData, setRestData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_page = await fetch(restPath);

        if (response_page.ok) {
          const restDataPage = await response_page.json();
          setRestData(restDataPage);
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

  return (
    <>
      {isLoaded ? (
        <section id="introduction" className="projects-wrapper">
          {restData.acf && restData.acf.projects_heading_image && (
            <img
              src={restData.acf.projects_heading_image.url}
              alt={restData.acf.projects_heading_image.alt}
              width="500px"
              height="300px"
            />
          )}
          <p>{restData.acf.projects_intro}</p>

          {restData.acf && restData.acf.project_card && (
            <section className="project-cards">
              {restData.acf.project_card.map((card, index) => (
                <div key={index} className="project-card">
                  <h2>{card.project_title}</h2>
                  {card.project_image && (
                    <img
                      src={card.project_image.url}
                      alt={card.project_image.alt}
                      width="300px"
                      height="200px"
                    />
                  )}
                  <p>{card.project_description}</p>
                  {/* Modify Link to use project_post_id */}
                  <Link to={`/project/${card.project_post_id}`}>Project</Link>
                </div>
              ))}
            </section>
          )}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Projects;
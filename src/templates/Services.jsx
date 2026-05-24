import React, { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';

const Services = () => {
  const restPath = restBase + 'pages/494';

  const [restData, setRestData] = useState(null);
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
        console.error('Error fetching services data:', error);
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [restPath]);

  return (
    <>
      {isLoaded && restData ? (
        <section id="services" className="services-wrapper">
          <section className="services-content">

            <article className="services-intro">
              {restData.acf?.services_heading && (
                <h1>{restData.acf.services_heading}</h1>
              )}

              {restData.acf?.services_intro && (
                <p className="services-page-intro">
                  {restData.acf.services_intro}
                </p>
              )}
            </article>

            {restData.acf?.services_offered_repeater && (
              <section className="services-list">
                {restData.acf.services_offered_repeater.map((service, index) => (
                  <article className="service-card" key={index}>
                    {service.services_icon?.url && (
                      <div className="service-icon-wrap">
                        <img
                          className="service-icon"
                          src={service.services_icon.url}
                          alt={service.services_icon.alt || ''}
                        />
                      </div>
                    )}

                    <div className="service-copy">
                      {service.services_heading && (
                        <h2 className="service-heading">
                          {service.services_heading}
                        </h2>
                      )}

                      {service.services_text && (
                        <p className="service-text">
                          {service.services_text}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </section>
            )}

            {restData.acf?.services_call_to_action && (
              <article className="services-call-to-action">
                <p>{restData.acf.services_call_to_action}</p>

                {restData.acf?.global_buttons && (
                  <GlobalButtons buttons={restData.acf.global_buttons} />
                )}
              </article>
            )}

          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Services;

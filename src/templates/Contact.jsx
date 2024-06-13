import { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';

const Contact = () => {
  const restPath = restBase + 'pages/86';
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
        <section id="contact" className="contact-wrapper">
        <article className="contact-intro">
          <h2>{restData.acf.contact_heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: restData.acf.contact_intro }}></div>
        </article>
        <section className="contact-icons">
        {restData.acf.contact_email && (
          <p className='contact-email'>{restData.acf.contact_email}</p>
          )}
          {restData.acf.contact_icons && restData.acf.contact_icons.map((icon, index) => (
            <a key={index} href={icon.contact_icon_url} target="_blank" rel="noopener noreferrer">
              <img src={icon.contact_icon_image.url} alt={icon.contact_icon_image.alt} />
            </a>
          ))}
        </section>
        <section className="contact-btn-call-to-action">
            {restData.acf.global_buttons && (
            <GlobalButtons buttons={restData.acf.global_buttons} />
          )}
          </section>
      </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Contact;

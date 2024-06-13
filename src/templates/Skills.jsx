import { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';

const Services = () => {
  const restPath = restBase + 'pages/81';
  const [restData, setRestData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const[selectedTab, setSelectedTab] = useState('all');

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

  const filterIcons = (category) => {
    if (!restData.acf || !restData.acf.skills_icon_section) return [];
    if (category === 'all') return restData.acf.skills_icon_section;
    return restData.acf.skills_icon_section.filter(skill => skill.skills_category === category);
  };


  return (
    <>
      {isLoaded ? (
        <section id="skills" className="skills-wrapper">
          <article className='skills-intro'>
            <h2>{restData.acf.skills_header}</h2>
            <div dangerouslySetInnerHTML={{ __html: restData.acf.skills_intro }} />
          </article>
          <section className='skills-icons'>
            <div className="tabs">
              <button onClick={() => setSelectedTab('all')}>All</button>
              <button onClick={() => setSelectedTab('Web Dev')}>Web Dev</button>
              <button onClick={() => setSelectedTab('GIS')}>GIS</button>
            </div>
            {filterIcons(selectedTab).map((skill, index) => (
              <div key={index} className="skills-icon">
                {skill.skills_icon && (
                  <a href={skill.skills_icon.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={skill.skills_icon.url}
                      alt={skill.skills_icon.alt}
                      width="64px"
                      height="64px"
                    />
                  </a>
                )}
              </div>
            ))}
          </section>
          <section className="skills-btn-call-to-action">
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

export default Services;

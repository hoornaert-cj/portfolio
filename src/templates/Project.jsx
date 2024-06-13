import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import GlobalButtons from '../components/GlobalButtons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Project = () => {
  const { id } = useParams();
  const restPath = `${restBase}cjh-project/${id}/?acf_format=standard`;
  const [projectData, setProjectData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      console.log(`Fetching project from URL: ${restPath}`);
      try {
        const response = await fetch(restPath);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched project data:', data);

        setProjectData(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error.message);
        setIsLoaded(true);
      }
    };
    fetchProject();
  }, [restPath]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">Error fetching project: {error}</div>;
  }

  return (
    <div className="project-details">
      <h1>{projectData.acf.indv_project_title_heading}</h1>
      {projectData.acf.project_animation && (
        <img
          src={projectData.acf.project_animation.url}
          alt={projectData.acf.project_animation.alt || 'Project animation'}
          autoPlay
          style={{ width: '400px' }}
        />
      )}

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Tools Used</Tab>
          <Tab>Reflection</Tab>
        </TabList>

        <TabPanel>
          <section className="description-repeater">
            {projectData.acf.description_repeater.map((desc, index) => (
              <div key={index}>
                <h3>{desc.indv_project_type}</h3>
                <div dangerouslySetInnerHTML={{ __html: desc.indv_project_description }} />
                {desc.indv_project_live_link_label && desc.indv_project_live_link_url && (
                  <a
                    href={desc.indv_project_live_link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    {desc.indv_project_live_link_label}
                  </a>
                )}
                {desc.indv_project_github_label && desc.indv_project_github_url && (
                  <a
                    href={desc.indv_project_github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    {desc.indv_project_github_label}
                  </a>
                )}
              </div>
            ))}
          </section>
        </TabPanel>

        <TabPanel>
          <section className="tools-used-repeater">
            {projectData.acf.tools_used_repeater.map((tool, index) => (
              <div key={index}>
                <h4>{tool.indv_tools_heading}</h4>
                <div dangerouslySetInnerHTML={{ __html: tool.indv_tools_description }} />
              </div>
            ))}
          </section>
        </TabPanel>

        <TabPanel>
          <section className="reflection-repeater">
            {projectData.acf.reflection_repeater.map((reflection, index) => (
              <div key={index}>
                <h3>{reflection.indv_reflection_heading}</h3>
                <div dangerouslySetInnerHTML={{ __html: reflection.indv_reflection }} />
              </div>
            ))}
          </section>
        </TabPanel>
      </Tabs>

      {projectData.acf.global_buttons && (
        <GlobalButtons buttons={projectData.acf.global_buttons} />
      )}
    </div>
  );
};

export default Project;

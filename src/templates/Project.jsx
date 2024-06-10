import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';

const Project = () => {
  const { id } = useParams();
  const restPath = `${restBase}cjh-project/${id}`;
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
        setProjectData(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error.message);
        setIsLoaded(true); // Set to true to display error message
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
      <h1>{projectData.acf.indv_project_heading}</h1>
      {projectData.acf.project_animation && (
        <img
          src={projectData.acf.project_animation}
          alt={projectData.acf.project_animation_alt || "Project animation"}
        />
      )}
      {projectData.acf.description_repeater && (
        <div className="description-repeater">
          <h3>{projectData.acf.indv_project_heading}</h3>
          {projectData.acf.description_repeater.map((desc, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: desc.indv_project_description }} />
          ))}
        </div>
      )}
      {projectData.acf.tools_used_repeater && (
        <div className="tools-used-repeater">
          {projectData.acf.tools_used_repeater.map((tool, index) => (
            <div key={index}>
              <h3>{tool.indv_tools_heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: tool.indv_tools_description }} />
            </div>
          ))}
        </div>
      )}
      {projectData.acf.reflection_repeater && (
        <div className="reflection-repeater">
          {projectData.acf.reflection_repeater.map((reflection, index) => (
            <div key={index}>
              <h2>{reflection.indv_reflection_heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: reflection.indv_reflection }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;

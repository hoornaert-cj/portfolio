import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import GlobalButtons from "../components/GlobalButtons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import "./Project.scss"; // Import your SCSS file

const Project = () => {
  const { slug } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const fetchProject = async () => {
      console.log(`Fetching project for slug: ${slug}`);
      try {
        const response = await fetch(`${restBase}cjh-project?acf_format=standard&project_slug=${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched project data:", data);

        setProjectData(data[0]);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.message);
        setIsLoaded(true);
      }
    };
    fetchProject();
  }, [slug]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">Error fetching project: {error}</div>;
  }

  if (!projectData || !projectData.acf) {
    return <div className="error-message">Project data not found or incomplete.</div>;
  }

  return (
    <div className="indv-project-wrapper">
      <section className="indv-project-content">
        <section className="indv-project-intro">
          <h1>{projectData.acf.indv_project_title_heading}</h1>
          {projectData.acf.project_animation && (
            <img
              src={projectData.acf.project_animation.url}
              alt={projectData.acf.project_animation.alt || "Project animation"}
              autoPlay
            />
          )}
        </section>

        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Tools</Tab>
            <Tab>Reflection</Tab>
          </TabList>

          <TabPanel>
            <section className="description-repeater">
              {projectData.acf.description_repeater.map((desc, index) => (
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: desc.indv_project_description,
                    }}
                  />
                  <section className='description-repeater-buttons'>
                    {desc.indv_project_live_link_label &&
                      desc.indv_project_live_link_url && (
                        <a
                          href={desc.indv_project_live_link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button"
                        >
                          {desc.indv_project_live_link_label}
                        </a>
                      )}
                    {desc.indv_project_github_label &&
                      desc.indv_project_github_url && (
                        <a
                          href={desc.indv_project_github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button"
                        >
                          {desc.indv_project_github_label}
                        </a>
                      )}
                  </section>
                </div>
              ))}
            </section>
          </TabPanel>

          <TabPanel>
            <section className="tools-used-repeater">
              {projectData.acf.tools_used_repeater.map((tool, index) => (
                <div key={index}>
                  <h4>{tool.indv_tools_heading}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: tool.indv_tools_description,
                    }}
                  />
                </div>
              ))}
            </section>
          </TabPanel>

          <TabPanel>
            <section className="reflection-repeater">
              {projectData.acf.reflection_repeater.map((reflection, index) => (
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: reflection.indv_reflection,
                    }}
                  />
                </div>
              ))}
            </section>
          </TabPanel>
        </Tabs>

        {isLargeScreen && projectData.acf.small_project_images && (
          <section className="project-gallery">
            <div className="gallery-thumbnails">
              {projectData.acf.small_project_images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  className="project-image"
                />
              ))}
            </div>
          </section>
        )}

{projectData.acf.global_buttons && (
  <article className="contact-btn-call-to-action">
    <GlobalButtons buttons={projectData.acf.global_buttons} />
  </article>
)}
      </section>
    </div>
  );
};

export default Project;

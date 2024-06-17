import React, { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import GlobalButtons from "../components/GlobalButtons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Skills = () => {
  const restPath = restBase + "pages/81?acf_format=standard";
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
        console.error("Error fetching data:", error);
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  const filterIcons = (category) => {
    if (!restData.acf || !restData.acf.skills_icon_section) return [];
    if (category === "all") return restData.acf.skills_icon_section;
    return restData.acf.skills_icon_section.filter(
      (skill) => skill.skills_category === category,
    );
  };

  return (
      <>
        {isLoaded ? (
          <section id="skills" className="skills-wrapper">
            <section className="skills-content">
              {restData.acf.skills_logo && (
                <div className="skills-logo">
                  <img
                    src={restData.acf.skills_logo.url}
                    alt={restData.acf.skills_logo.alt}
                    width="150px" // You can adjust the width as needed
                    height="auto"
                  />
                </div>
              )}
              <article className="skills-intro">
                <h2>{restData.acf.skills_header}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: restData.acf.skills_intro }}
                />
              </article>
              <Tabs>
                <TabList>
                  <Tab>All</Tab>
                  <Tab>Web Dev</Tab>
                  <Tab>GIS</Tab>
                </TabList>

                <TabPanel>
                  <section className="skills-icons">
                    {filterIcons("all").map((skill, index) => (
                      <div key={index} className="skills-icon">
                        {skill.skills_icon && (
                          <a
                            href={skill.skills_icon.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                </TabPanel>

                <TabPanel>
                  <section className="skills-icons">
                    {filterIcons("Web Dev").map((skill, index) => (
                      <div key={index} className="skills-icon">
                        {skill.skills_icon && (
                          <a
                            href={skill.skills_icon.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                </TabPanel>

                <TabPanel>
                  <section className="skills-icons">
                    {filterIcons("GIS").map((skill, index) => (
                      <div key={index} className="skills-icon">
                        {skill.skills_icon && (
                          <a
                            href={skill.skills_icon.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                </TabPanel>
              </Tabs>
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

export default Skills;

import React from 'react';
import './Projects.css';

function Projects({projects}) {

  const projectList = [
    {
      title: 'Project 1',
      description: 'This is a description of project 1 oijsioh wsqhdinwqs wd wdhuqhwdk dbdw dwbdbsdlknk lndsakldnklsnakl dnksnlkdnksnkdnlsanadkn salkdnklasndklnklsnk dlnklasdnkldsnklw dbdoibwd  qdwi d d h wqhd h ',
      technologies: 'React, Node, Express, MongoDB'
    },
    {
      title: 'Project 2',
      description: 'This is a descriendjlknsd s d d auis   hdha89sd adh89d d  sdhdh89h ds98h 98sption of project 2',
      technologies: 'React, Node, Express, MongoDB'
    },{
      title: 'Project 3',
      description: 'This is a description of project s, adm,andlknskd sdklansdkns das,njdsbjks3',
      technologies: 'React, Node, Express, MongoDB'
    },
    {
      title: 'Project 1',
      description: 'This is a description of project 1 oijsioh wsqhdinwqs wd wdhuqhwdk dbdw dwbdbsdlknk lndsakldnklsnakl dnksnlkdnksnkdnlsanadkn salkdnklasndklnklsnk dlnklasdnkldsnklw dbdoibwd  qdwi d d h wqhd h ',
      technologies: 'React, Node, Express, MongoDB'
    }

  ]

  return (
    <div
      className="ProjectsSection"
      style={{
        minHeight: projects?.dimensions?.minHeight || '100vh',
        width: projects?.dimensions?.width || '100vw',
        backgroundColor: projects?.background?.color,
      }}
    >
      <div className="projects-list"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${projects?.columns || 3}, 1fr)`,
        gap: projects?.projectItem?.spacing,
        margin: "0",
        padding: "2%",

      }}
      >
        {projectList.map((project, index) => (
          <div key={index} className="project-item"
          style={{
            boxShadow : projects?.projectItem?.style?.boxShadow,
            borderStyle : projects?.projectItem?.style?.border.borderStyle,
            borderRadius : projects?.projectItem?.style?.border.borderRadius,
            borderWidth : projects?.projectItem?.style?.border.borderWidth,
            borderColor : projects?.projectItem?.style?.border.borderColor,
            marginBottom: "2%",
            padding: "2%",
          }}
          >
            <h3
              style={{
                fontFamily: projects?.projectItem?.style?.title?.fontFamily,
                fontSize: projects?.projectItem?.style?.title?.fontSize,
                color: projects?.projectItem?.style?.title?.color,
              }}
            >
              {project?.title}
            </h3>
            <p
              style={{
                fontFamily: projects?.projectItem?.style?.description?.fontFamily,
                fontSize: projects?.projectItem?.style?.description?.fontSize,
                color: projects?.projectItem?.style?.description?.color,
              }}
            >
              {project?.description}
            </p>
            <p
              style={{
                fontFamily: projects?.projectItem?.style?.technologies?.fontFamily,
                fontSize: projects?.projectItem?.style?.technologies?.fontSize,
                color: projects?.projectItem?.style?.technologies?.color,
              }}
            >
             {project?.technologies}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

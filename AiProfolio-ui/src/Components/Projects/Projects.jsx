import React from 'react';
import './Projects.css';

function Projects({ dimensions, background, font, projects }) {
  return (
    <div
      className="ProjectsSection"
      style={{
        height: dimensions.height || '100vh',
        width: dimensions.width || '100vw',
        margin: dimensions.margin,
        textAlign: font.textAlign,
        backgroundColor: background.color,
      }}
    >
      <h2
        style={{
          fontFamily: font.fontFamily,
          fontWeight: font.h2.fontWeight,
          fontSize: font.h2.fontSize,
          color: font.h2.color,
        }}
      >
        Projects
      </h2>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.h3.fontWeight,
                fontSize: font.h3.fontSize,
                color: font.h3.color,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.p.fontWeight,
                fontSize: font.p.fontSize,
                color: font.p.color,
              }}
            >
              {project.description}
            </p>
            <p
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.p.fontWeight,
                fontSize: font.p.fontSize,
                color: font.p.color,
              }}
            >
              Tech Stack: {project.techStack}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

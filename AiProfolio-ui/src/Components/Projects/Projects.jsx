import React from 'react';
import './Projects.css';


function Projects({ projects, projectList }) {


    return (
        <div
            id="projects"
            style={{
                minHeight: projects?.dimensions?.minHeight || '100vh',
                width: '100vw',
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
                            boxShadow: projects?.projectItem?.style?.boxShadow,
                            borderStyle: projects?.projectItem?.style?.border?.borderStyle,
                            borderRadius: projects?.projectItem?.style?.border?.borderRadius,
                            borderWidth: projects?.projectItem?.style?.border?.borderWidth,
                            borderColor: projects?.projectItem?.style?.border?.borderColor,
                            marginBottom: "2%",
                            padding: "2%",
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: projects?.projectItem?.style?.title?.fontFamily,
                                fontSize: projects?.projectItem?.style?.title?.fontSize,
                                color: projects?.projectItem?.style?.title?.fontColor,
                            }}
                        >
                            {project?.title}
                        </h3>
                        <p
                            style={{
                                fontFamily: projects?.projectItem?.style?.description?.fontFamily,
                                fontSize: projects?.projectItem?.style?.description?.fontSize,
                                color: projects?.projectItem?.style?.description?.fontColor,
                            }}
                        >
                            {project?.description}
                        </p>
                        <p
                            style={{
                                fontFamily: projects?.projectItem?.style?.technologies?.fontFamily,
                                fontSize: projects?.projectItem?.style?.technologies?.fontSize,
                                color: projects?.projectItem?.style?.technologies?.fontColor,
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

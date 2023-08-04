import React from 'react';
import './Projects.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

function Projects({ projects, projectList }) {
    const breakpoints = {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
        1200: { items: 5 },
    };

    if (projectList.length >= 3) {
        return (
            <div
                id="projects"
                style={{
                    minHeight: projects?.dimensions?.minHeight || '100vh',
                    width: '100vw',
                    background: projects?.background?.color,
                    textAlign: "center",
                    alignItems: "center"
                }}
            >
                <h1 style={{
                    margin: "0",
                    fontFamily: projects?.title?.fontFamily,
                    fontSize: projects?.title?.fontSize,
                    color: projects?.title?.fontColor,
                    textAlign: "center",
                    paddingTop: "2%"
                }}>
                    Projects
                </h1>

                <Carousel
                    breakpoints={breakpoints}
                    showArrows={true}
                    style={{textAlign: "center", alignItems:"center"}}
                >
                    {projectList.map((project, index) => (
                        <div
                            key={index}
                            className="prod-item"
                            style={{
                                boxShadow: projects?.projectItem?.style?.boxShadow,
                                borderStyle: projects?.projectItem?.style?.border?.borderStyle,
                                borderRadius: projects?.projectItem?.style?.border?.borderRadius,
                                borderWidth: projects?.projectItem?.style?.border?.borderWidth,
                                borderColor: projects?.projectItem?.style?.border?.borderColor,
                                background: projects?.projectItem?.background?.color,
                                padding: "2%",
                                margin: "2%",
                                textAlign: "center",
                                alignItems: "center"
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
                                Technologies used: {project?.technologies}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    } else {
        return (
            <div
                id="projects"
                style={{
                    minHeight: projects?.dimensions?.minHeight || '100vh',
                    width: '100vw',
                    background: projects?.background?.color,
                }}
            >
                <h1 style={{
                    margin: "0",
                    fontFamily: projects?.title?.fontFamily,
                    fontSize: projects?.title?.fontSize,
                    color: projects?.title?.fontColor
                }}>
                    Projects
                </h1>

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
                                margin: "2%",
                                padding: "2%",
                                background: projects?.projectItem?.background?.color,
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
}

export default Projects;

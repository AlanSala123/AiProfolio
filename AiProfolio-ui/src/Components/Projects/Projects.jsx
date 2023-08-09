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


        return (
            <div
                id="projects"
                style={projects?.background}
            >
                <h1 style={projects?.title}>
                    Projects
                </h1>

                <Carousel
                    breakpoints={breakpoints}
                    showArrows={true}
                    style={projects?.item}
                >
                    {projectList.map((project, index) => (
                        <div
                            key={index}
                            className="prod-item"
                            style={projects?.item}
                        >
                            <h3
                                style={projects?.itemTitle}
                            >
                                {project?.title}
                            </h3>
                            <p
                                style={projects?.itemDescription}
                            >
                                {project?.description}
                            </p>
                            <p
                                style={projects?.itemTechnologies}
                            >
                                {project?.technologies}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    
}

export default Projects;

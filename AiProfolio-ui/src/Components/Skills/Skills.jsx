import React from 'react';
import './Skills.css';
import { 
    faJava, faPython, faJsSquare, faReact, faHtml5, faCss3Alt, faNodeJs, faGit, faDocker, faAngular, faVuejs, faSwift, faPhp, // Programming languages and libraries
    faWordpress, faLaravel, faSass, faLinux, faAws // Other technologies
} from '@fortawesome/free-brands-svg-icons'

import { faCode } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Skills({ skills, skillList }) {
    const skillIcons = {
        // Programming languages and libraries
        'java': faJava,
        'python': faPython,
        'javascript': faJsSquare,
        'js': faJsSquare,
        'react.js': faReact,
        'react' : faReact,
        'html': faHtml5,
        'css': faCss3Alt,
        'node.js': faNodeJs,
        'git': faGit,
        'docker': faDocker,
        'angular': faAngular,
        'vue.js': faVuejs,
        'swift': faSwift,
        'php': faPhp,
    };

    const genericSkills = {
        // Programming languages and libraries
        'c++' : faCode
    };

    // Create an array to hold the sorted skill items
    const sortedSkillItems = [];

    // First, add the skills that exist in skillIcons
    skillList.forEach(skill => {
        const skillName = skill.name.toLowerCase();
        if (skillIcons[skillName]) {
            sortedSkillItems.push(skill);
        }
    });

    // Then, add the remaining skills that are not in skillIcons
    skillList.forEach(skill => {
        const skillName = skill.name.toLowerCase();
        if (!skillIcons[skillName]) {
            sortedSkillItems.push(skill);
        }
    });

    return (
        <div
            id="skills"
            style={{
                width: '100vw',
                background: skills?.background?.color,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <h1
                style={{
                    fontFamily: skills?.title?.fontFamily,
                    fontSize: skills?.title?.fontSize,
                    color: skills?.title?.fontColor
                }}
            >
                Skills
            </h1>
            <div className="skills-container"> 
                <ul style={{
                    width: '95%',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    textAlign: skills?.skillItem?.alignment?.textAlign,
                    verticalAlign: skills?.skillItem?.alignment?.verticalAlign,
                    gap: '1em',
                    margin: "0",
                    listStyle: 'none',
                    marginBottom: "4vh",
                }}>
                    {sortedSkillItems.map((skill, index) => {
                        const progress = skill.progress?.replace('%', '') || 0;
                        return (
                            <li
                                key={index}
                                style={{
                                    boxShadow: skills?.skillItem?.style?.boxShadow,
                                    borderStyle: skills?.skillItem?.style?.border?.borderStyle,
                                    borderWidth: skills?.skillItem?.style?.border?.borderWidth,
                                    borderColor: skills?.skillItem?.style?.border?.borderColor,
                                    borderRadius: skills?.skillItem?.style?.border?.borderRadius,
                                    background: skills?.skillItem?.style?.backgroundColor,
                                    maxWidth: skills?.skillItem?.dimensions?.maxWidth,
                                    minWidth: skills?.skillItem?.dimensions?.minWidth,
                                    maxHeight: skills?.skillItem?.dimensions?.maxHeight,
                                    paddingLeft: "1.5%",
                                    paddingRight: "1.5%",
                                    paddingTop: "1.5%",
                                    paddingBottom: "1.5%",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"

                                }}
                            >
                                {skillIcons[skill.name.toLowerCase()] ? (
                                    <>
                                        <h1>
                                            <FontAwesomeIcon style={{
                                                fontSize: skills?.skillItem?.dimensions?.maxHeight,
                                                color: skills?.skillItem?.style?.name?.fontColor,
                                                margin: "0",
                                                scale : "1.05"
                                            }} icon={skillIcons[skill.name.toLowerCase()]} />
                                        </h1>
                                    </>
                                ) : (
                                    <>
                                        <h2
                                            style={{
                                                fontSize: skills?.skillItem?.style?.name?.fontSize,
                                                color: skills?.skillItem?.style?.name?.fontColor,
                                                fontFamily: skills?.skillItem?.style?.name?.fontFamily,
                                            }}
                                        >
                                            {genericSkills[skill.name.toLowerCase()] && <FontAwesomeIcon icon={genericSkills[skill.name.toLowerCase()]} />}
                                            &nbsp;
                                            {skill.name}
                                        </h2>
                                        {skill?.level && (
                                            <p
                                                style={{
                                                    fontSize: skills?.skillItem?.style?.level?.fontSize,
                                                    color: skills?.skillItem?.style?.level?.fontColor,
                                                    fontFamily: skills?.skillItem?.style?.level?.fontFamily,
                                                    margin: "0"
                                                }}
                                            >
                                                {skill.level}
                                            </p>
                                        )}
                                        {skill.progress && (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    minHeight: skills?.skillItem?.style?.progressBar.minHeight,
                                                    backgroundColor: skills?.skillItem?.style?.progressBar?.backgroundColor || "#ddd",
                                                    borderRadius: skills?.skillItem?.style?.progressBar?.border?.borderRadius || '3px',
                                                    borderStyle: skills?.skillItem?.style?.progressBar?.border?.borderStyle,
                                                    borderWidth: skills?.skillItem?.style?.progressBar?.border?.borderWidth,
                                                    borderColor: skills?.skillItem?.style?.progressBar?.border?.borderColor,
                                                    marginBottom: "1em",
                                                    marginTop: "0.5em"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${progress}%`,
                                                        height: '100%',
                                                        backgroundColor: skills?.skillItem?.style?.progressBar?.color || "#4CAF50",
                                                        borderRadius: skills?.skillItem?.style?.progressBar?.border?.borderRadius
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Skills;

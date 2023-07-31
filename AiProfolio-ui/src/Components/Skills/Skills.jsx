import React from 'react';
import './Skills.css';
import { 
    faJava, faPython, faJsSquare, faReact, faHtml5, faCss3Alt, faNodeJs, faGit, faDocker, faAngular, faVuejs, faSwift, faPhp, // Programming languages and libraries
    faWordpress, faLaravel, faSass, faLinux, faAws// Other technologies
  } from '@fortawesome/free-brands-svg-icons'

  import { faCode } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Skills({ skills, skillList }) {

    const skillIcons = {
        // Programming languages and libraries
        'java': faJava,
        'python': faPython,
        'javascript': faJsSquare,

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
        'c++' : faCode
      };


    return (
        <div
            id="skills"
            style={{
                minHeight: skills?.dimensions?.minHeight || '50vh',
                width: '100vw',
                backgroundColor: skills?.background?.color,
                padding : "5vw",
                boxSizing: "border-box"
            }}
        >
            <ul style={{
                display: "flex",
                flexDirection: "row",
                flexWrap : "wrap",
                textAlign : skills?.skillItem?.alignment?.textAlign,
                verticalAlign : skills?.skillItem?.alignment?.verticalAlign,
                gap : skills?.skillItem?.spacing || '1em',
                margin : "0",
                listStyle: 'none'
            }}>
                {skillList.map((skill, index) => {
                    const progress = skill.progress?.replace('%', '') || 0;
                    return (
                    <li
                        key={index}
                        style={{
                            boxShadow : skills?.skillItem?.style?.boxShadow,
                            borderStyle : skills?.skillItem?.style?.border?.borderStyle,
                            borderWidth : skills?.skillItem?.style?.border?.borderWidth,
                            borderColor : skills?.skillItem?.style?.border?.borderColor,
                            borderRadius : skills?.skillItem?.style?.border?.borderRadius,
                            maxWidth : "30%",
                            minWidth : skill?.progress ? "30%" : "5%",
                            paddingLeft : "1%",
                            paddingRight : "1%",
                            paddingTop : "1%",
                            paddingBottom : "1%",
                            marginBottom : "2%",
                            textAlign : "center"
                        }}
                    >
                        <h2
                        style={{
                            fontSize : skills?.skillItem?.style?.name?.fontSize,
                            color : skills?.skillItem?.style?.name?.fontColor,
                            fontFamily : skills?.skillItem?.style?.name?.fontFamily,
                        }}
                        >
                        {skillIcons[skill.name.toLowerCase()] && <FontAwesomeIcon icon={skillIcons[skill.name.toLowerCase()]} />}
                        &nbsp;
                        {skill.name}
                        
                        </h2>

                        {(skills?.showLevel && skill.level) &&
                            <p
                            style={{
                                fontSize : skills?.skillItem?.style?.level?.fontSize,
                                color : skills?.skillItem?.style?.level?.fontColor,
                                fontFamily : skills?.skillItem?.style?.level?.fontFamily,
                            }}
                            >
                            {skill.level}
                            </p>
                        }

                        {(skills?.showProgressBar && skill.progress) &&
                            <div 
                            style={{
                                width: '100%',
                                height: '20px',
                                backgroundColor: skills?.skillItem?.style?.progressBar?.backgroundColor || "#ddd",
                                borderRadius: '3px',
                                marginBottom: "1em"
                            }}
                            >
                                <div 
                                style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    backgroundColor: skills?.skillItem?.style?.progressBar?.color || "#4CAF50",
                                    borderRadius: '3px'
                                }}
                                ></div>
                            </div>
                        }
                    </li>
                )})}
            </ul>
        </div>
    );
}

export default Skills;

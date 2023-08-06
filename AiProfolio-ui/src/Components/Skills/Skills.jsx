import React from 'react';
import './Skills.css';
import { 
    faJava, faPython, faJsSquare, faReact, faHtml5, faCss3Alt, faNodeJs, faGit, faDocker, faAngular, faVuejs, faSwift, faPhp, // Programming languages and libraries
    faWordpress, faLaravel, faSass, faLinux, faAws, // Other technologies
    faGithub
} from '@fortawesome/free-brands-svg-icons'

import { faCode } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Skills({ skills, skillList }) {
    const skillIcons = {
        
        'java': faJava,
        'python': faPython,
        'javascript': faJsSquare,
        'js': faJsSquare,
        'react.js': faReact,
        'react' : faReact,
        'html': faHtml5,
        'css': faCss3Alt,
        'node.js': faNodeJs,
        'node' : faNodeJs,
        'git': faGit,
        'github' : faGithub,
        'docker': faDocker,
        'angular': faAngular,
        'vue.js': faVuejs,
        'swift': faSwift,
        'php': faPhp,
    };

    const genericSkills = {
        
        'c++' : faCode
    };

    const sortedSkillItems = [];

    skillList.forEach(skill => {
        const skillName = skill.name.toLowerCase();
        if (skillIcons[skillName]) {
            sortedSkillItems.push(skill);
        }
    });

    skillList.forEach(skill => {
        const skillName = skill.name.toLowerCase();
        if (!skillIcons[skillName]) {
            sortedSkillItems.push(skill);
        }
    });

    return (
        <div id="skills" style={skills?.background}>
            <h1 style={skills?.title}> Skills </h1>
            <div className="skills-container"> 
                <ul style={skills?.list}>
                    {sortedSkillItems.map((skill, index) => {
                        const progress = skill.progress?.replace('%', '') || 0;
                        return (
                            <li
                                key={index}
                                style={skills?.item}
                            >
                                {skillIcons[skill.name.toLowerCase()] ? (
                                    <>
                                        <h1>
                                            <FontAwesomeIcon style={{...skills?.itemTitle, fontSize: skills?.item?.minWidth}} icon={skillIcons[skill.name.toLowerCase()]} />
                                        </h1>
                                    </>
                                ) : (
                                    <>
                                        <h2
                                            style={skills?.itemTitle}
                                        >
                                            {genericSkills[skill.name.toLowerCase()] && <FontAwesomeIcon icon={genericSkills[skill.name.toLowerCase()]} />}
                                            &nbsp;
                                            {skill.name}
                                        </h2>
                                        {skill?.level && (
                                            <p
                                                style={skills?.itemLevel}
                                            >
                                                {skill.level}
                                            </p>
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

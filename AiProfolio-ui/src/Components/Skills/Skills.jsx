import React from 'react';
import './Skills.css';

function Skills({ dimensions, background, font, skills, skillBoxes }) {
    return (
        <div
            className="SkillsSection"
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
                Skills
            </h2>
            <ul>
                {skills.map((skill, index) => (

                    <li
                        key={index}
                        style={{
                            fontFamily: font.fontFamily,
                            fontWeight: font.li.fontWeight,
                            fontSize: font.li.fontSize,
                            color: font.li.color,
                            borderRadius: skillBoxes.borderRadius,
                        }}
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Skills;

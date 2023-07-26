import React from 'react';
import './Skills.css';

function Skills({ skills }) {
    const skillList = ["Python", "Web dev", "more stuff", "spanish"]
    console.log(skills)

    return (
        <div
            className="SkillsSection"
            style={{
                minHeight: skills?.dimensions?.minHeight,
                width: skills?.dimensions?.width || '100vw',
                backgroundColor: skills?.background?.color,
                padding : "5%"
            }}

        >
            
            <ul style={{
                display: "flex",
                flexDirection: "rows",
                textAlign : skills?.skillItem?.alignment?.textAlign,
                verticalAlign : skills?.skillItem?.alignment?.verticalAlign,
                gap : skills?.skillItem?.spacing,
                margin : "0"
            }}>
                {skillList.map((skill, index) => (

                    <li
                        key={index}
                        style={{
                            boxShadow : skills?.skillItem?.style?.boxShadow,
                            borderStyle : skills?.skillItem?.style?.border?.borderStyle,
                            borderWidth : skills?.skillItem?.style?.border?.borderWidth,
                            borderColor : skills?.skillItem?.style?.border?.borderColor,
                            borderRadius : skills?.skillItem?.style?.border?.borderRadius,
                            paddingLeft : "1%",
                            paddingRight : "1%"
                        }}
                    >
                        <h2
                        style={{
                            fontSize : skills?.skillItem?.style?.name?.fontSize,
                            fontColor : skills?.skillItem?.style?.name?.fontColor,
                            fontFamily : skills?.skillItem?.style?.name?.fontFamily,
                        }}
                        >
                        {skill}
                        </h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Skills;

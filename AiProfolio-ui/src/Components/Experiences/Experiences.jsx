import React from 'react';
import './Experiences.css';

function Experience({ experiences, experienceList }) {

    return (
        <div
            id="experience"
            style={{
                minHeight: experiences?.dimensions?.minHeight || '50vh',
                width: '100vw',
                backgroundColor: experiences?.background?.color,
                padding : "5vw",
                boxSizing: "border-box"
            }}
        >
            <ul style={{
                display: "flex",
                flexDirection: "column",
                textAlign : experiences?.experienceItem?.alignment?.textAlign,
                verticalAlign : experiences?.experienceItem?.alignment?.verticalAlign,
                gap : experiences?.experienceItem?.spacing || '1em',
                margin : "0",
                listStyle : "none"
            }}>
                {experienceList.map((experience, index) => (
                    <li
                        key={index}
                        style={{
                            boxShadow : experiences?.experienceItem?.style?.boxShadow,
                            borderStyle : experiences?.experienceItem?.style?.border?.borderStyle,
                            borderWidth : experiences?.experienceItem?.style?.border?.borderWidth,
                            borderColor : experiences?.experienceItem?.style?.border?.borderColor,
                            borderRadius : experiences?.experienceItem?.style?.border?.borderRadius,
                            paddingLeft : "1%",
                            paddingRight : "1%",

                            paddingBottom : "1%",
                            marginBottom : "2%"
                        }}
                    >
                        <h2
                        style={{
                            fontSize : experiences?.experienceItem?.style?.title?.fontSize,
                            color : experiences?.experienceItem?.style?.title?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.title?.fontFamily,
                        }}
                        >
                        {experience.title}
                        </h2>

                        <p
                        style={{
                            fontSize : experiences?.experienceItem?.style?.description?.fontSize,
                            color : experiences?.experienceItem?.style?.description?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.description?.fontFamily,
                        }}
                        >
                        {experience.description}
                        </p>

                        <p
                        style={{
                            fontSize : experiences?.experienceItem?.style?.date?.fontSize,
                            color : experiences?.experienceItem?.style?.date?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.date?.fontFamily,
                        }}
                        >
                        {experience.date}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Experience;

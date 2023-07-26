import React from 'react';
import './Experiences.css';

function Experiences({ experiences }) {

    const experienceList = [
        {
          title: "Software Engineer",
          description: "Developed web applications using JavaScript, React, and Node.js.",
          dates: "June 2019 - Present",
        },
        {
          title: "Product Manager",
          description: "Led product development and launch of a new mobile app.",
          dates: "January 2017 - May 2019",
        },
        {
          title: "Marketing Specialist",
          description: "Implemented marketing campaigns and analyzed customer data.",
          dates: "July 2015 - December 2016",
        },
      ];
      

    return (
        <div
            className="experienceSection"
            style={{
                minHeight : experiences?.dimensions?.minHeight,
                width : "90vw",
                backgroundColor : experiences?.background?.color,
                padding : "5vw"
            }}

        >
            
            <ul style={{
                display: "flex",
                flexDirection: "rows",
                textAlign : experiences?.experienceItem?.alignment?.textAlign,
                verticalAlign : experiences?.experienceItem?.alignment?.verticalAlign,
                gap : experiences?.experienceItem?.spacing,
                margin : "0",
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
                            listStyle : "none"
                            
                        }}
                    >
                        <h1
                        style={{
                            fontSize : experiences?.experienceItem?.style?.title?.fontSize,
                            fontColor : experiences?.experienceItem?.style?.title?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.title?.fontFamily,
                        }}
                        >
                        {experience.title}
                        </h1>
                        <p
                        style={{
                            fontSize : experiences?.experienceItem?.style?.description?.fontSize,
                            fontColor : experiences?.experienceItem?.style?.description?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.description?.fontFamily,
                        }}>
                            {experience.description}
                        </p>
                        <p
                        style={{
                            fontSize : experiences?.experienceItem?.style?.date?.fontSize,
                            fontColor : experiences?.experienceItem?.style?.date?.fontColor,
                            fontFamily : experiences?.experienceItem?.style?.date?.fontFamily,
                        }}>
                            {experience.dates}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Experiences;

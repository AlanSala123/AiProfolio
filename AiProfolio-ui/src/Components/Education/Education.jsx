import React from 'react';
import './Education.css';


function Education({ education, educationData }) {

      
  return (
    <div
      id="education"
      style={{
        width: '90vw',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        paddingTop: '5vh',
        backgroundColor: education?.background?.color,
      }}
    >
      <ul style={{
                display: "flex",
                flexDirection: "column",
                textAlign : education?.educationItem?.alignment?.textAlign,
                gap : education?.educationItem?.spacing || '1em',
                margin : "0"
            }}>

        {educationData?.map((educations, index) => (
          <li key={index}
          style={{
            listStyle : "none",
            boxShadow : education?.educationItem?.style?.boxShadow,
            borderStyle : education?.educationItem?.style?.border?.borderStyle,
            borderRadius : education?.educationItem?.style?.border?.borderRadius,
            borderWidth : education?.educationItem?.style?.border?.borderWidth,
            borderColor : education?.educationItem?.style?.border?.borderColor,
            paddingLeft : "1%",
            paddingRight : "1%",
            paddingTop : "1%",
            paddingBottom : "1%",
            marginBottom : "2%"
          }}>
            <h3
              style={{
                fontFamily: education?.educationItem?.style?.institution?.fontFamily,
                fontSize: education?.educationItem?.style?.institution?.fontSize,
                color: education?.educationItem?.style?.institution?.fontColor,
              }}
            >
              {educations.institution}
            </h3>
            <p
              style={{
                fontFamily: education?.educationItem?.style?.degree?.fontFamily,
                fontSize: education?.educationItem?.style?.degree?.fontSize,
                color: education?.educationItem?.style?.degree?.fontColor,
              }}
            >
              {educations.degree}
            </p>
            <p
              style={{
                fontFamily: education?.educationItem?.style?.major?.fontFamily,
                fontSize: education?.educationItem?.style?.major?.fontSize,
                color: education?.educationItem?.style?.major?.fontColor,
              }}
            >
              {educations.major}
            </p>
            <p
              style={{
                fontFamily: education?.educationItem?.style?.date?.fontFamily,
                fontSize: education?.educationItem?.style?.date?.fontSize,
                color: education?.educationItem?.style?.date?.fontColor,
              }}
            >
              {educations.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Education;

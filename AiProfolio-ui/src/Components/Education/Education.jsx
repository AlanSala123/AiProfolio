import React from 'react';
import './Education.css';

function Education({ education }) {
    const educationData = [
        {
          degree: "Bachelor of Science",
          institution: "University of XYZ",
          major: "Computer Science",
          date: "2015 - 2019",
        },
        {
          degree: "Master of Business Administration",
          institution: "ABC Business School",
          major: "Business Administration",
          date: "2020 - 2022",
        },
      ];
      
  return (
    <div
      className="EducationSection"
      style={{
        height: education?.dimensions?.minHeight || '100vh',
        width: '90vw',
        padding: '5vw',
        textAlign: education?.educationItem?.alignment?.textAlign,
        backgroundColor: education?.background?.color,
      }}
    >
      <ul className="education-list">

        {educationData.map((educations, index) => (
          <li key={index}
          style={{
            listStyle : "none",
            boxShadow : education?.educationItem?.style?.boxShadow,
            borderStyle : education?.educationItem?.style?.border?.borderStyle,
            borderRadius : education?.educationItem?.style?.border?.borderRadius,
            borderWidth : education?.educationItem?.style?.border?.borderWidth,
            borderColor : education?.educationItem?.style?.border?.borderColor,
            marginTop : "20px",
            marginLeft : "20%",
            textAlign : "center",
            width : "50%"
          }}>
            <h3
              style={{
                fontFamily: education?.institution?.fontFamily,
                fontSize: education?.institution?.fontSize,
                color: education?.institution?.fontColor,
              }}
            >
              {educations.institution}
            </h3>
            <p
              style={{
                fontFamily: education?.degree?.fontFamily,
                fontSize: education?.degree?.fontSize,
                color: education?.degree?.fontColor,
              }}
            >
              {educations.degree}
            </p>
            <p
              style={{
                fontFamily: education?.major?.fontFamily,
                fontSize: education?.major?.fontSize,
                color: education?.major?.fontColor,
              }}
            >
              {educations.major}
            </p>
            <p
              style={{
                fontFamily: education?.date?.fontFamily,
                fontSize: education?.date?.fontSize,
                color: education?.date?.fontColor,
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

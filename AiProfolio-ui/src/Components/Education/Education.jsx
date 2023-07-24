import React from 'react';
import './Education.css';

function Education({ dimensions, background, font, educationData }) {
  return (
    <div
      className="EducationSection"
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
        Education
      </h2>
      <ul className="education-list">
        {educationData.map((education, index) => (
          <li key={index}>
            <h3
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.h3.fontWeight,
                fontSize: font.h3.fontSize,
                color: font.h3.color,
              }}
            >
              {education.degree}
            </h3>
            <p
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.p.fontWeight,
                fontSize: font.p.fontSize,
                color: font.p.color,
              }}
            >
              {education.school}
            </p>
            <p
              style={{
                fontFamily: font.fontFamily,
                fontWeight: font.p.fontWeight,
                fontSize: font.p.fontSize,
                color: font.p.color,
              }}
            >
              {education.duration}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Education;

import React from 'react';
import './Education.css';


function Education({ education, educationData }) {

      
  return (
    <div
      id="education"
      style={education?.background}
    >
      <h1 style={education?.title}>Education</h1>
      <ul style={education?.list}>

        {educationData?.map((educations, index) => (
          <li key={index}
          style={education?.item}>
            <h3
              style={education?.itemInstitution}
            >
              {educations.institution}
            </h3>
            <p
              style={education?.itemDetails}
            >
              {educations.degree}
            </p>
            <p
              style={education?.itemDetails}
            >
              {educations.major}
            </p>
            <p
              style={education?.itemDetails}
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

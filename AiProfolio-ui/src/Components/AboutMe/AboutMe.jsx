import React from 'react';

function AboutMe({ about, data, images }) {


    return (
        <div id="about" style={about?.background} >
            <h2 style={about?.title}> About </h2>
            <p style={about?.summary}> {data?.summary} </p>
        </div>
    );
}

export default AboutMe;

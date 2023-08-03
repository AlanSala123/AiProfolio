import React from 'react';

function AboutMe({ about, data, images }) {


    return (
        <div
            id="about"
            style={{
                width: '100vw',
                background: about?.background?.color,
                padding : "5vw",
                boxSizing: "border-box"
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems : about?.aboutItem?.alignment?.verticalAlign,
                justifyContent : about?.aboutItem?.alignment?.textAlign,
                gap : about?.aboutItem?.spacing || '1em',
            }}>
                <h2
                style={{
                    fontSize : about?.aboutItem?.style?.name?.fontSize,
                    color : about?.aboutItem?.style?.name?.fontColor,
                    fontFamily : about?.aboutItem?.style?.name?.fontFamily,
                }}
                >
                About
                </h2>
                <p
                style={{
                    fontSize : about?.aboutItem?.style?.description?.fontSize,
                    color : about?.aboutItem?.style?.description?.fontColor,
                    fontFamily : about?.aboutItem?.style?.description?.fontFamily,
                }}
                >
                {data?.summary}
                </p>
            </div>
        </div>
    );
}

export default AboutMe;

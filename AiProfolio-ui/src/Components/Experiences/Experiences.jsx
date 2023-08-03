import React from 'react';
import './Experiences.css';
function Experience({experiences, experienceList}) {
    
    if(experienceList.length > 3) {
        return (
            <div id="experience" className="timeline" style={{ maxWidth: '100%', boxSizing: 'border-box', background: experiences?.background.color}}>
                <h1 style={{color: experiences.title.color, fontFamily: experiences.title.fontFamily, fontSize: experiences.title.fontSize, fontWeight: experiences.title.fontWeight, margin: '0', paddingTop: '20px'}}>EXPERIENCE</h1>
                {experienceList.map((experience, index) => (
                    <div
                        key={index}
                        className="container"
                        style={{
                            width: '40%',
                            margin: '20px 0',
                            transition: 'transform .5s',
                            maxHeight: '200px',
                            marginLeft:'15%',
                            marginRight:'15%'
                        }}
                    >
                        <div className="content" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform .5s' }}>
                            <div className="front" style={{ padding: '10px 20px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, background: experiences?.experienceItem?.background?.color, borderStyle: experiences?.experienceItem?.style?.border?.borderStyle, borderWidth: experiences?.experienceItem?.style?.border?.borderWidth, borderColor: experiences?.experienceItem?.style?.border?.borderColor, borderRadius: experiences?.experienceItem?.style?.border?.borderRadius || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2, transform: 'rotateY(0deg)' }}>
                                <h2 style={{
                                    fontSize: experiences?.experienceItem?.style?.title?.fontSize,
                                    color: experiences?.experienceItem?.style?.title?.fontColor,
                                    fontFamily: experiences?.experienceItem?.style?.title?.fontFamily,
                                }}>{experience.title}</h2>
                                <h4 style={{fontSize: experiences?.experienceItem?.style?.date?.fontSize,
                                    color: experiences?.experienceItem?.style?.date?.fontColor,
                                    fontFamily: experiences?.experienceItem?.style?.date?.fontFamily,}}>{experience.date}</h4>
                            </div>
                            <div className="back" style={{ padding: '10px 20px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, background: experiences?.experienceItem?.background?.color, borderStyle: experiences?.experienceItem?.style?.border?.borderStyle, borderWidth: experiences?.experienceItem?.style?.border?.borderWidth, borderColor: experiences?.experienceItem?.style?.border?.borderColor, borderRadius: experiences?.experienceItem?.style?.border?.borderRadius || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transform: 'rotateY(180deg)', overflow: 'scroll', paddingTop: '40px' }}>
                            <p style={{
                                marginBottom: '1.25rem',
                                textAlign: 'justify',
                                lineHeight: 1.7,
                                fontWeight: 500,
                                fontFamily: experiences?.experienceItem?.style?.date?.fontFamily,
                                textShadow: '1px 1px #888',
                                color: experiences?.experienceItem?.style?.date?.fontColor,
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                fontSize: experiences?.experienceItem?.style?.date?.fontSize
                                }}>{experience.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div
                id="experience"
                style={{
                    width: '100vw',
                    background: experiences?.background?.color,
                    padding: "5vw",
                    boxSizing: "border-box"
                }}
            >
                <ul style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: experiences?.experienceItem?.alignment?.textAlign,
                    verticalAlign: experiences?.experienceItem?.alignment?.verticalAlign,
                    gap: experiences?.experienceItem?.spacing || '1em',
                    margin: "0",
                    listStyle: "none"
                }}>
                    {experienceList.map((experience, index) => (
                        <li
                            key={index}
                            style={{
                                boxShadow: experiences?.experienceItem?.style?.boxShadow,
                                borderStyle: experiences?.experienceItem?.style?.border?.borderStyle,
                                borderWidth: experiences?.experienceItem?.style?.border?.borderWidth,
                                borderColor: experiences?.experienceItem?.style?.border?.borderColor,
                                borderRadius: experiences?.experienceItem?.style?.border?.borderRadius,
                                paddingLeft: "1%",
                                paddingRight: "1%",
                                paddingBottom: "1%",
                                marginBottom: "2%",
                                background: experiences?.experienceItem?.background?.color,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: experiences?.experienceItem?.style?.title?.fontSize,
                                    color: experiences?.experienceItem?.style?.title?.fontColor,
                                    fontFamily: experiences?.experienceItem?.style?.title?.fontFamily,
                                }}
                            >
                                {experience.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: experiences?.experienceItem?.style?.description?.fontSize,
                                    color: experiences?.experienceItem?.style?.description?.fontColor,
                                    fontFamily: experiences?.experienceItem?.style?.description?.fontFamily,
                                }}
                            >
                                {experience.description}
                            </p>
                            <p
                                style={{
                                    fontSize: experiences?.experienceItem?.style?.date?.fontSize,
                                    color: experiences?.experienceItem?.style?.date?.fontColor,
                                    fontFamily: experiences?.experienceItem?.style?.date?.fontFamily,
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
}
export default Experience;


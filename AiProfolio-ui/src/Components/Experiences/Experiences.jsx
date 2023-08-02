import React from 'react';
// import './Experiences.css';
function Experience({experiences, experienceList}) {
    
    if(experienceList.length > 20) {
        return (
            <div className="timeline" style={{ maxWidth: experiences?.dimensions?.maxWidth || '1200px', padding: experiences?.padding || '50px 0', boxSizing: 'border-box'}}>
                {experienceList.map((experience, index) => (
                    <div
                        key={index}
                        className="container"
                        style={{
                            padding: experiences?.containerItem?.style?.padding || 30,
                            width: experiences?.containerItem?.style?.width || '60%',
                            margin: experiences?.containerItem?.style?.margin || '40px 0',
                            transition: experiences?.containerItem?.style?.transition || 'transform .5s',
                            perspective: experiences?.containerItem?.style?.perspective || 1000,
                            maxHeight:experiences?.containerItem?.style?.maxHeight || '400px'
                        }}
                    >
                        <div className="content" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform .5s' }}>
                            <div className="front" style={{ padding: '20px 30px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, backgroundColor: experiences?.containerItem?.style?.backgroundColor || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2, transform: 'rotateY(0deg)' }}>
                                <h2 style={{ color: '#1A1A1A', textTransform: 'uppercase', fontWeight: 800, fontFamily: 'Montserrat, sans-serif', textShadow: '2px 2px #888', WebkitTextStroke: '1px #888' }}>{experience.title}</h2>
                                <h3>{experience.company}</h3>
                                <h4>{experience.year}</h4>
                            </div>
                            <div className="back" style={{ padding: '20px 30px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, backgroundColor: experiences?.containerItem?.style?.backgroundColor || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transform: 'rotateY(180deg)' }}>
                            <p style={{
                                marginBottom: '1.25rem',
                                textAlign: 'justify',
                                lineHeight: 1.7,
                                fontWeight: 500,
                                fontFamily: 'Lato, sans-serif',
                                textShadow: '1px 1px #888',
                                color: 'black',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                fontSize: '15px'
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
                    minHeight: experiences?.dimensions?.minHeight || '50vh',
                    width: '100vw',
                    backgroundColor: experiences?.background?.color,
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
                                marginBottom: "2%"
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
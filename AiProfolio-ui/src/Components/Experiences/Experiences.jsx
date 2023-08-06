import React from 'react';
// import './Experiences.css';
function Experience({experiences, experienceList}) {
    
    // if(experienceList.length > 5) {
    //     return (
    //         <div className="timeline" style={{ maxWidth: experiences?.dimensions?.maxWidth || '1200px', padding: experiences?.padding || '50px 0', boxSizing: 'border-box'}}>
    //             {experienceList.map((experience, index) => (
    //                 <div
    //                     key={index}
    //                     className="container"
    //                     style={{
    //                         padding: experiences?.containerItem?.style?.padding || 30,
    //                         width: experiences?.containerItem?.style?.width || '60%',
    //                         margin: experiences?.containerItem?.style?.margin || '40px 0',
    //                         transition: experiences?.containerItem?.style?.transition || 'transform .5s',
    //                         perspective: experiences?.containerItem?.style?.perspective || 1000,
    //                         maxHeight:experiences?.containerItem?.style?.maxHeight || '400px'
    //                     }}
    //                 >
    //                     <div className="content" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform .5s' }}>
    //                         <div className="front" style={{ padding: '20px 30px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, backgroundColor: experiences?.containerItem?.style?.backgroundColor || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2, transform: 'rotateY(0deg)' }}>
    //                             <h2 style={{ color: '#1A1A1A', textTransform: 'uppercase', fontWeight: 800, fontFamily: 'Montserrat, sans-serif', textShadow: '2px 2px #888', WebkitTextStroke: '1px #888' }}>{experience.title}</h2>
    //                             <h3>{experience.company}</h3>
    //                             <h4>{experience.year}</h4>
    //                         </div>
    //                         <div className="back" style={{ padding: '20px 30px', position: 'absolute', width: 'calc(100% - 60px)', height: 'calc(100% - 40px)', backfaceVisibility: 'hidden', borderRadius: 6, backgroundColor: experiences?.containerItem?.style?.backgroundColor || '#FFFFFF', color: '#696969', fontFamily: 'Montserrat, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transform: 'rotateY(180deg)' }}>
    //                         <p style={{
    //                             marginBottom: '1.25rem',
    //                             textAlign: 'justify',
    //                             lineHeight: 1.7,
    //                             fontWeight: 500,
    //                             fontFamily: 'Lato, sans-serif',
    //                             textShadow: '1px 1px #888',
    //                             color: 'black',
    //                             overflowWrap: 'break-word',
    //                             wordWrap: 'break-word',
    //                             fontSize: '15px'
    //                             }}>{experience.description}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // } else {
        return (
            <div id="experiences" style={experiences?.background} >
                <h2 style={experiences?.title}> Experience </h2>
                <ul style={experiences?.list}>
                    {experienceList.map((experience, index) => (
                        <li key={index} style={{...experiences?.item, width : index == 0 ? "100%" : experiences?.item?.width}} >
                            <h2 style={experiences?.itemTitle} > {experience.title} </h2>
                            <p style={experiences?.itemDescription} > {experience.description} </p>
                            <p style={experiences?.itemDate}> {experience.date} </p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
// }
export default Experience;
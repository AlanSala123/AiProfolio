import './ContactMe.css';

function ContactMe({ dimensions, background, font, contactInfo, imgprop }) {
    return (
        <div
            className="ContactMe"
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
                Contact Me
            </h2>
            <div className="contact-container">
                <div className="contact-info">
                    <ul>
                        <li>
                            {contactInfo.email && (
                                <li>
                                    Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                                </li>
                            )}
                        </li>
                        {contactInfo.phone && (
                            <li>
                                Phone: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                            </li>
                        )}
                        {contactInfo.address && <li>Address: {contactInfo.address}</li>}
                    </ul>
                </div>
                <div className="contact-img">
                    {imgprop ? <img src={imgprop.source} /> : <></>}
                </div>
            </div>
        </div>
    );
}

export default ContactMe;


import React, { useState, useEffect } from 'react';
import './About.css';

export default function AboutUs() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const servicesElement = document.querySelector('.about-us-container');
      const bounding = servicesElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (bounding.top < windowHeight) {
        setAnimate(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-us-container">
        <h1 className='about-header'>About Us</h1>
      <div className="about-box" style={{ display: animate ? 'block' : 'none' }}>
        <img
          src="https://media.licdn.com/dms/image/D4E03AQGzOTHBDxAh4g/profile-displayphoto-shrink_800_800/0/1679439879252?e=1695254400&v=beta&t=cjn8XG2EMofwrlHtahLmS7bY_dVZsm2_pbv0OV7qh-Y"
          alt="Person 1"
          className="about-image"
        />
        <h3 className="about-name">Marwan Kabir</h3>
        <p className="about-description">Hi, I'm Marwan</p>
      </div>

      <div className="about-box" style={{ display: animate ? 'block' : 'none' }}>
        <img
          src="https://media.licdn.com/dms/image/D5603AQFH-DfWF_1vmg/profile-displayphoto-shrink_800_800/0/1686029839874?e=1695254400&v=beta&t=xiUrcGZqZSRnaAbxAypAK2gk4Q7d6oTWrPwQTRsSy8c"
          alt="Person 2"
          className="about-image"
        />
        <h3 className="about-name">Luis Bravo</h3>
        <p className="about-description">Hi, I'm Luis</p>
      </div>

      <div className="about-box" style={{ display: animate ? 'block' : 'none' }}>
        <img
          src="https://media.licdn.com/dms/image/C4E03AQGVNfYXWWLEFg/profile-displayphoto-shrink_800_800/0/1651170466467?e=1695254400&v=beta&t=oxbPmyX_iMDUGF6DvuZxRul6Yq-JnqtSZ035sFXnxxA"
          alt="Person 3"
          className="about-image"
        />
        <h3 className="about-name">Alan Salazar</h3>
        <p className="about-description">Hi, I'm Alan</p>
      </div>
    </div>
  );
}

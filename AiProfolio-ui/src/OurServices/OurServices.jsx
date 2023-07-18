import React, { useEffect, useState } from 'react';
import "./OurServices.css";
import IconSVG from '../assets/IconSVG.jsx';
import computer from '../assets/Computer.jsx';
import Customize from '../assets/Customize.jsx';

export default function OurServices() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const servicesElement = document.querySelector('.services-container');
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
    <div className="our-services">
      <h2 className="section-title"> Services</h2>
      <h2 className="section-heading">Taking your career to the next level</h2>
      <div className={`services-container ${animate ? 'animate' : ''}`}>
        <div className="service">
          {computer}
          <p className="service-heading">Create</p>
          <p className="service-p">All you need to do is drag and drop your resume and we will generate a personal portfolio website</p>
        </div>
        <div className="service">
          {IconSVG}
          <p className="service-heading">Share</p>
          <p className="service-p">Once your portfolio is generated you can share the link with others to view your portfolio</p>
        </div>
        <div className="service">
          {Customize}
          <p className="service-heading">Customize</p>
          <p className="service-p">You can update anything in your portfolio with a simple click of a button</p>
        </div>
      </div>
    </div>
  );
}

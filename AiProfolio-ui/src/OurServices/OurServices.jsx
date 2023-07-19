import React, { useEffect, useState } from 'react';
import "./OurServices.css";
import IconSVG from '../assets/IconSVG.jsx';
import computer from '../assets/Computer.jsx';
import Customize from '../assets/Customize.jsx';

//our services section in the webpage
export default function OurServices() {
//useState for animate
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    //function to track whenever the user scrolls to the services container section
    const handleScroll = () => {
      const servicesElement = document.querySelector('.services-container');
      //gets the position on the services container relative to the viewport
      const bounding = servicesElement.getBoundingClientRect();
      //gets the height of the viewport
      const windowHeight = window.innerHeight;
    
      //check to see if the top of the services container is in the viewport
      if (bounding.top < windowHeight) {
        setAnimate(true);
      }
    };
    //adds handleScroll as an event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="our-services">
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

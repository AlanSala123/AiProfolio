import React, { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);
  return <div ref={tilt} {...rest} />
}

export default function AboutUs() {
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 30
  };

  return (
    <div className="bod">
      <section>
        <h2 className="team">Our Team</h2>
        <div className="container">
          <div className="card">
            <div className="content">
              <div className="imgBx"><img src="https://media.licdn.com/dms/image/D4E03AQGzOTHBDxAh4g/profile-displayphoto-shrink_800_800/0/1679439879252?e=1695254400&v=beta&t=cjn8XG2EMofwrlHtahLmS7bY_dVZsm2_pbv0OV7qh-Y" /></div>
              <div className="contentBx">
                <h3>Marwan Kabir<br /><span>Software Engineer Intern</span></h3>
              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': 1 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
              <li style={{ '--i': 2 }}><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li style={{ '--i': 3 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
            </ul>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgBx"><img src="https://media.licdn.com/dms/image/D5603AQFH-DfWF_1vmg/profile-displayphoto-shrink_800_800/0/1686029839874?e=1695254400&v=beta&t=xiUrcGZqZSRnaAbxAypAK2gk4Q7d6oTWrPwQTRsSy8c" /></div>
              <div className="contentBx">
                <h3>Luis Bravo<br /><span>Software Engineer Intern</span></h3>

              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': 1 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
              <li style={{ '--i': 2 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
              <li style={{ '--i': 3 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
            </ul>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgBx"><img src="https://media.licdn.com/dms/image/C4E03AQGVNfYXWWLEFg/profile-displayphoto-shrink_800_800/0/1651170466467?e=1695254400&v=beta&t=oxbPmyX_iMDUGF6DvuZxRul6Yq-JnqtSZ035sFXnxxA" /></div>
              <div className="contentBx">
                <h3>Alan Salazar<br /><span>Software Engineer Intern</span></h3>

              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': 1 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
              <li style={{ '--i': 2 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
              <li style={{ '--i': 3 }}><a href="#"><FontAwesomeIcon icon={faCity} /></a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    /* // <div className="entire-section">
    //   <h1 className="our-team"> Our Team </h1>
    //   <div className="about-container">
    //     <div className="test">
    //     <Tilt options={options}>
    //       <div className="about-card" data-tilt>
    //         <img src="https://media.licdn.com/dms/image/D4E03AQGzOTHBDxAh4g/profile-displayphoto-shrink_800_800/0/1679439879252?e=1695254400&v=beta&t=cjn8XG2EMofwrlHtahLmS7bY_dVZsm2_pbv0OV7qh-Y" alt="Marwan Kabir" />
    //         <h2> Marwan Kabir </h2>
    //         <p>Hi, I'm Marwan</p>
    //         <div className='links'>
    //           <a href="https://LinkedIn.com"><img src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" /></a>
    //         </div>
    //       </div>
    //     </Tilt>
    //     </div>
    //     <Tilt options={options}>
    //       <div className="about-card" data-tilt>
    //         <img src="https://media.licdn.com/dms/image/D5603AQFH-DfWF_1vmg/profile-displayphoto-shrink_800_800/0/1686029839874?e=1695254400&v=beta&t=xiUrcGZqZSRnaAbxAypAK2gk4Q7d6oTWrPwQTRsSy8c" alt="Marwan Kabir" />
    //         <h2> Luis Bravo </h2>
    //         <p> Hi, I'm Luis</p>
    //         <div className='links'>
    //           <a href="https://LinkedIn.com"><img src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" /></a>
    //         </div>
    //       </div>
    //     </Tilt>
    //     <Tilt options={options}>
    //       <div className="about-card" data-tilt>
    //         <img src="https://media.licdn.com/dms/image/C4E03AQGVNfYXWWLEFg/profile-displayphoto-shrink_800_800/0/1651170466467?e=1695254400&v=beta&t=oxbPmyX_iMDUGF6DvuZxRul6Yq-JnqtSZ035sFXnxxA" alt="Marwan Kabir" />
    //         <h2> Alan Salazar </h2>
    //         <p>Hi, I'm Alan</p>
    //         <div className='links'>
    //           <a href="https://LinkedIn.com"><img src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" /></a>
    //         </div>
    //       </div>
    //     </Tilt>
    //   </div>
  // </div> */
  );
}

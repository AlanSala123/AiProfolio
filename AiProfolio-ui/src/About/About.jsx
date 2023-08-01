import React, { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function AboutUs() {

  return (
    <div className="bod">
      <section>
        <h2 id="team">Our Team</h2>
        <div className="container">
          <div className="card">
            <div className="content">
              <div className="imgBx"><img src="https://media.licdn.com/dms/image/D4E03AQGzOTHBDxAh4g/profile-displayphoto-shrink_800_800/0/1679439879252?e=1695254400&v=beta&t=cjn8XG2EMofwrlHtahLmS7bY_dVZsm2_pbv0OV7qh-Y" /></div>
              <div className="contentBx">
                <h3>Marwan Kabir<br /><span>Software Engineer Intern</span></h3>
              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': 1 }}><a href="https://github.com/MarwanKabir"><FontAwesomeIcon icon={faGithub} /></a></li>
              <li style={{ '--i': 2 }}><a href="https://www.linkedin.com/in/marwan-kabir"><FontAwesomeIcon icon={faLinkedin} /></a></li>
              <li style={{ '--i': 3 }}><a href="mailto: mkabir@salesforce.com"><FontAwesomeIcon icon={faEnvelope} /></a></li>
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
              <li style={{ '--i': 1 }}><a href="https://github.com/Bravo-Luis"><FontAwesomeIcon icon={faGithub} /></a></li>
              <li style={{ '--i': 2 }}><a href="https://www.linkedin.com/in/luis-bravo-62a479220"><FontAwesomeIcon icon={faLinkedin} /></a></li>
              <li style={{ '--i': 3 }}><a href="mailto: lbravo@salesforce.com"><FontAwesomeIcon icon={faEnvelope} /></a></li>
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
              <li style={{ '--i': 1 }}><a href="https://github.com/AlanSala123"><FontAwesomeIcon icon={faGithub} /></a></li>
              <li style={{ '--i': 2 }}><a href="https://www.linkedin.com/in/alan-sala/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
              <li style={{ '--i': 3 }}><a href="mailto: alan.salazar@salesforce.com"><FontAwesomeIcon icon={faEnvelope} /></a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

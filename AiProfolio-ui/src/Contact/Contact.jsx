import React from 'react';
import './Contact.css';

export default function ContactUs() {
  return (
    <div className="contact-container">
      <div className="text">
        Contact Us
      </div>
      <form action="#">
        <div className="form-row">
          <div className="input-data">
            <input type="text" placeholder="First Name" required />
            <div className="underline"></div>
          </div>
          <div className="input-data">
            <input type="text" placeholder="Last Name" required />
            <div className="underline"></div>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="text" placeholder="Email Address" required />
            <div className="underline"></div>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data textarea">
            <textarea rows="8" cols="80" placeholder="Write your message" required></textarea>
            <div className="underline"></div>
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

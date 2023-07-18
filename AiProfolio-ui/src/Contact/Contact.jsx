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
            <input type="text" required />
            <div className="underline"></div>
            <label>First Name</label>
          </div>
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Last Name</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="text" required />
            <div className="underline"></div>
            <label>Email Address</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data textarea">
            <textarea rows="8" cols="80" required></textarea>
            <div className="underline"></div>
            <label>Write your message</label>
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
  )
}

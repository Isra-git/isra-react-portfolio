import React from 'react';

import contactImg from '../../../static/assets/images/contact/contact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function About() {
  return (
    <div className="contact-wrapper">
      <div
        className="contact-left-wrapper"
        style={{
          backgroundImage: `url(${contactImg})`,
        }}
      >
        <div className="contact-left-silk">
          {/* <h1>Contact</h1> */}
          <h1>israDev</h1>
        </div>
      </div>
      <div className="contact-right-wrapper">
        <section className="contact-section">
          <div className="contact-info">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="contact-text">943-555-555</div>
          </div>
          <div className="contact-info">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="contact-text">
              <a href="mailto:villar_80@hotmail.com">villar_80@hotmail.com</a>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div className="contact-text">
              <a>Github (proximamente)</a>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div className="contact-text">
              <a>Linkedin (proximamente)</a>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="contact-text">Irun -Guipuzcoa- 20300</div>
          </div>
        </section>
      </div>
    </div>
  );
}

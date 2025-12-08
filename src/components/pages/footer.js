import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Importamos el icono del sobre
import { Link } from 'react-router-dom'; // Si lo vas a usar para navegar, aunque para mailto no es estrictamente necesario Link

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtener el año actual dinámicamente

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <p>
            Creado por <span className="highlight">IsraDev</span> &copy; {currentYear} MIT License
            Copyright (c)
          </p>
        </div>

        <div className="footer-contact">
          <a href="mailto:villar_80@hotmail.com" className="email-link">
            <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

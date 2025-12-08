import React from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

// Importamos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const NavigationComponent = props => {
  const dynamycLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  //logout
  const handleSignOut = () => {
    axios
      .delete('https://api.devcamp.space/logout', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push('/');
          props.handleSuccessfulLogout(); // Llamamos a la funcion que maneja el logout exitoso
        }
        return response.data; // Cuando se trabaja con promesas, siempre es buena idea devolver algo
      })
      .catch(error => {
        console.log('Error sign out', error);
      });
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/about-me" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div>
        {props.loggedInStatus === 'LOGGED_IN'
          ? dynamycLink('/portfolio-manager', 'Portfolio Manager')
          : null}
      </div>

      <div className="right-side">
        <div className="right-side-wrapper">
          {props.loggedInStatus === 'LOGGED_IN' ? (
            <div className="user-info">
              <span style={{ marginRight: '8px' }}>
                {new Date().toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })}
              </span>
              <span className="user-greeting">Hola </span>
              <span className="user-email">{props.userEmail && props.userEmail.split('@')[0]}</span>

              <a onClick={handleSignOut} className="icon-link" aria-label="Cerrar sesión">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </a>
            </div>
          ) : (
            <NavLink to="/auth" className="icon-link" aria-label="Iniciar sesión">
              ENTRAR
              <FontAwesomeIcon icon={faCircleUser} />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default withRouter(NavigationComponent);

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

import miLogo from '../../../static/assets/images/navbar/miLogo2.png';

// Importamos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCircleUser } from '@fortawesome/free-solid-svg-icons';

class NavigationComponent extends Component {
  constructor(props) {
    super(props);

    // Estado para controlar la visibilidad del menú lateral izquierdo
    this.state = {
      isFloating: false,
    };

    // Creación de referencia para el contenedor principal
    this.navRef = React.createRef();

    // Enlace de métodos al contexto de la clase
    this.handleSignOut = this.handleSignOut.bind(this);
    this.dynamycLink = this.dynamycLink.bind(this);
  }

  // Inicialización del IntersectionObserver para detectar scroll fuera de rango
  setupObserver() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        // Solo activa el modo flotante si la ruta actual es /blog
        if (this.props.location.pathname === '/blog') {
          // si el div sale fuera del viewPort
          this.setState({ isFloating: !entry.isIntersecting });
        } else {
          this.setState({ isFloating: false });
        }
      },
      // cuando el último píxel del componente desaparece de la pantalla
      { threshold: 0 }
    );

    if (this.navRef.current) {
      this.observer.observe(this.navRef.current);
    }
  }

  // Ciclo de vida: Activación del observador tras montaje
  componentDidMount() {
    this.setupObserver();
  }

  // Ciclo de vida: Limpieza de estado al cambiar de ruta
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname !== '/blog') {
        this.setState({ isFloating: false });
      }
    }
  }

  // Ciclo de vida: Desconexión del observador para optimizar memoria
  componentWillUnmount() {
    if (this.observer && this.navRef.current) {
      this.observer.unobserve(this.navRef.current);
    }
  }

  dynamycLink(route, linkText) {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  }

  // maneja el logout
  handleSignOut() {
    axios
      .delete('https://api.devcamp.space/logout', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          this.props.history.push('/');
          this.props.handleSuccessfulLogout(); // Llamamos a la funcion que maneja el logout exitoso
        }
        return response.data;
      })
      .catch(error => {
        console.log('Error sign out', error);
      });
  }

  render() {
    return (
      <div className="nav-wrapper" ref={this.navRef}>
        <div className="logo-side">
          <img src={miLogo} alt="Logo" />
        </div>

        {/* Aplicación de clase dinámica al lateral izquierdo */}
        <div className={`left-side ${this.state.isFloating ? 'side-menu-active' : ''}`}>
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
          {this.props.loggedInStatus === 'LOGGED_IN'
            ? this.dynamycLink('/portfolio-manager', 'Portfolio Manager')
            : null}
        </div>

        <div className="right-side">
          <div className="right-side-wrapper">
            {this.props.loggedInStatus === 'LOGGED_IN' ? (
              <div className="user-info">
                <span className="user-greeting">Hi </span>
                <span className="user-email">
                  {this.props.userEmail && this.props.userEmail.split('@')[0]}
                </span>

                <a onClick={this.handleSignOut} className="icon-link" aria-label="Cerrar sesión">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </a>
              </div>
            ) : (
              <NavLink to="/auth" className="icon-link" aria-label="Iniciar sesión">
                LOGIN
                <FontAwesomeIcon icon={faCircleUser} />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavigationComponent);

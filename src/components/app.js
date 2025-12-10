import React, { Component } from 'react';
import axios from 'axios';

//componentes de react router para manejar las rutas
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from './pages/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './pages/nomatch';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

//import Icons from '../helpers/icons';
import '../style/main.scss';
import Footer from './pages/footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      userEmail: '',
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  //Logeado con éxito
  handleSuccessfulLogin(email) {
    //Guardamos el email del usuario en el almacenamiento local
    localStorage.setItem('userEmail', email);
    // Actualizamos el estado
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      userEmail: email,
    });
  }

  //No logeado
  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
    });
  }

  //Cierra sesión
  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
    });
  }

  //Comprobamos el estado del login
  checkLoginStatus() {
    return axios
      .get('https://api.devcamp.space/logged_in', {
        withCredentials: true,
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === 'LOGGED_IN') {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
          });
        } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
          });
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  //Comprobamos el estado del login cuando el componente se monta para saber si
  // el usuario ya estaba logeado y si esta guardado el mail en el almacenamiento local
  componentDidMount() {
    this.checkLoginStatus().then(() => {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail && this.state.loggedInStatus === 'LOGGED_IN') {
        this.setState({ userEmail: savedEmail });
      }
    });
  }

  //Rutas que solo se renderizan si estás logeado
  authorizedPages() {
    return [<Route key="valorUnico" path="/portfolio-manager" component={PortfolioManager} />];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div className="navbar">
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              userEmail={this.state.userEmail}
            />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route // Props rendering, hace que podamos pasar props al componente
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    loggedInStatus={this.state.loggedInStatus}
                    userEmail={this.state.userEmail}
                  />
                )}
              />

              {/* <Route path="/portfolio" component={Auth} /> */}
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />

              <Route
                path="/blog"
                render={props => <Blog {...props} loggedInStatus={this.state.loggedInStatus} />}
              />

              <Route
                path="/b/:slug"
                render={props => (
                  <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />

              {/* Comprueba si estás logeado para ver la página */}
              {this.state.loggedInStatus === 'LOGGED_IN' ? this.authorizedPages() : null}

              <Route path="/portfolio/:slug" component={PortfolioDetail} />

              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

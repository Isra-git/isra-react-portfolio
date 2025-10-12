import React, { Component } from 'react';
import axios from 'axios';

//componentes de react router para manejar las rutas
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./pages/portfolio-detail";
import Auth from "./pages/auth";
//import noMatch from "./pages/no-match";

import '../style/main.scss';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }
  
  //logeado con exito
  handleSuccessfulLogin() {
  this.setState({
    loggedInStatus: "LOGGED_IN"
  });
}
// no logeado
handleUnSuccessfulLogin() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
}

//Cierra sesion
handleSuccessfulLogout() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
}

//Comprobamos el estado del login
checkLoginStatus() {
  return axios
    .get("https://api.devcamp.space/logged_in", {
       withCredentials: true
     })
     .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

//Comprobamos el estado del login cuando el componente se monta para saber si el usuario ya estaba logeado
  componentDidMount() {
    this.checkLoginStatus();
  }

  autorizedPages() {
    return [
      <Route path="/blog" component={Blog} />
    ];
  }

  
  render() {

    return (
      <div className='container'>
         <Router>
          <div>
           
            <NavigationContainer
             loggedInStatus={this.state.loggedInStatus} 
             handleSuccessfulLogout={this.handleSuccessfulLogout}
             />

            <h2>{this.state.loggedInStatus}</h2>

            <Switch>
              <Route exact path="/" component={Home} />

              <Route // Props rendering, hace qyue podamos pasar props al componente
                path="/auth" 
                render={props => (
                  <Auth 
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              <Route path="/portfolio" component={Auth} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              
              {/* Comprueba si estas logeado para ver la pagina */}
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                this.autorizedPages()): (<Redirect to="/auth" />)}

              <Route path="/portfolio/:id" component={PortfolioDetail} />
            </Switch>

            
          </div>
        </Router>
      </div>
    );
  }
}

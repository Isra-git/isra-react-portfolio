import React from "react";
import axios from "axios";
import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const NavigationComponent = (props) => {  
  
  const dynamycLink = (route,linkText) => {
    return (
       <div className="nav-link-wrapper">
                <NavLink to="/blog" activeClassName="nav-link-active">
                  Blog
                </NavLink>
          </div>

    );
  }

  //logout
  const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/"); 
          props.handleSuccessfulLogout(); // Llamamos a la funcion que maneja el logout exitoso
        }
        return response.data; // Cuando se trabaja con promesas, siempre es buena idea devolver algo
      })
      .catch(error => {
        console.log("Error sign out", error);
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
          {props.loggedInStatus === "LOGGED_IN" ? dynamycLink("/blog","Blog") : null}

            
          </div>

          <div className="right-side">
            <div className="right-side-wrapper">
             Israel Villar 
            </div>
            <div className="right-side-wrapper">
              {props.loggedInStatus === "LOGGED_IN" ? 
                (<a onClick={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out

                </a> ) : null}
            </div>
          </div>
      </div>
    );
  };
export default withRouter(NavigationComponent);

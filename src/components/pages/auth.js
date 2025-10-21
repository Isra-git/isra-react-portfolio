import React, {Component} from "react";
import Login from "../auth/login";

// importamos la imagen de fondo del login
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default class Auth extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth=this.handleSuccessfulAuth.bind(this);
        this.handleUnSuccessfulAuth=this.handleUnSuccessfulAuth.bind(this);

    }

    //Si el login es exitoso, llamamos a la funcion que nos pasan por props desde app.js
    // y redirigimos al usuario a la pagina principal
    handleSuccessfulAuth(email){
        this.props.handleSuccessfulLogin(email);
        this.props.history.push("/");

    }

    //Si el login no es exitoso, llamamos a la funcion que nos pasan por props desde app.js
    handleUnSuccessfulAuth(){
        this.props.handleUnSuccessfulLogin();
    }

    render(){

        return(
            <div className="auth-page-wrapper">
                <div className="left-column"
                style={{
                    backgroundImage: `url(${loginImg})`,
                    
                  }}
                
                />

                

                <div className="right-column">

                    {/* Pasamos al componente login los props que necesita para manejar la autenticacion */}
                    <Login
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}

                    />
                </div>

            </div>
        );
    }
}
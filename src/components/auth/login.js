import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: "",
        password: "",
        errorText: ""
    };

    //Bindear las funciones para que tengan acceso al this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value,
    errorText:"" // Limpiamos el mensaje de error cuando el usuario escribe
  });
}


    handleSubmit(event) {
        
        axios.post("https://api.devcamp.space/sessions", {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        }, { withCredentials: true }
            )
            .then(response => {  // con withCredentials decimos que queremos enviar las cookies al servidor
                if (response.data.status === 'created') {
                  this.props.handleSuccessfulAuth(); // Llamamos a la funcion que maneja el login exitoso

                } else {
                  this.setState({ errorText: "Wrong email or password" });
                  this.props.handleUnSuccessfulAuth(); // Llamamos a la funcion que maneja el login no exitoso
                }
            })
            .catch(error => {   // capturamos cualquier error que pueda ocurrir
                 
                this.setState({                                     
                    errorText: "An error occurred. Please try again."
                });
                this.props.handleUnSuccessfulAuth(); // Llamamos a la funcion que maneja el login no exitoso
            });

        event.preventDefault(); // Evita que el formulario se envie y recargue la pagina
        }

        
  render() {

    return (
      <div>
         <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
         <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>
            <input 
                type="text"
                name="email" // Tiene que coincidir con el nombre del estado {email}
                placeholder="Your email"
                value={this.state.email} 
                onChange={this.handleChange} // Actualiza el estado cuando el usuario escribe
            />
              <input 
                type="password"
                name="password" // Tiene que coincidir con el nombre del estado {password}
                placeholder="Your password"
                value={this.state.password} 
                onChange={this.handleChange} // Actualiza el estado cuando el usuario escribe
            /> 

            <div>
                 <button type="submit">Login</button>
        
            </div>
        </form> 
      </div>
    );
  }
}
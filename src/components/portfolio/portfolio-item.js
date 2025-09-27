//Creacion de un componente funcional
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function(props) {
    return(
        <div>
            <br></br>
            <h3>Post: {props.position}</h3>
            <h3>Nombre: {props.name}</h3>
            <h4>
            <Link to= {props.url}> {props.url} </Link>
            </h4>
            <br></br>
        </div>
    );
}
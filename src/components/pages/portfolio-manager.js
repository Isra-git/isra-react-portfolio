//Componente de clase react 16
import React, { Component } from 'react';
import axios from 'axios';

//Componente de lista lateral del portafolio
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortFolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
    constructor(){
        super();

        this.state = {
            portfolioItems: [] 
        };

        //Damos acceso a this en el método
        this.handleSuccessfullFormSubmision = this.handleSuccessfullFormSubmision.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    }

    handleSuccessfullFormSubmision(portfolioItem){
    // Añdimos el nuevo elemento al estado (matriz de elementos del portafolio)
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
    }

    handleFormSubmissionError(err){
        console.log("handleFormSubmissionError error", err);
    }

    getPortfolioItems(){
        // ?order_by=created_at&direction=desc -> Parametros opcionales de la API para ordenar los elementos mas nuevos primero
        axios.get("https://isradev.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", 
            {withCredentials: true
        }).then(response => {
            this.setState({
                //spread operator para romper la matriz y separar los elementos
                portfolioItems:[...response.data.portfolio_items] 
            });
        }).catch(error => {
            console.log("error in getportfolio", error);
        });
    }

    componentDidMount(){
        this.getPortfolioItems();
    }
  
    render() {

    return (
        <div className='portfolio-manager-wrapper'>
            <div className='left-column'>
                <PortFolioForm
                    handleSuccessfullFormSubmision={this.handleSuccessfullFormSubmision}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                />
            </div>

            <div className='right-column'>
                <PortfolioSidebarList data={this.state.portfolioItems} />
            </div>
        </div>

    );
    }  
}
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
            portfolioItems: [],
            portfolioToEdit: {}
        };

        //Damos acceso a this en el método
        this.handleNewFormSubmision = this.handleNewFormSubmision.bind(this);
        this.handleEditFormSubmision = this.handleEditFormSubmision.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }
    // Método para limpiar el estado del portafolio a editar
    clearPortfolioToEdit(){
        this.setState({
            portfolioToEdit: {}
        });
    }
    // Método para editar un elemento del portafolio
    handleEditClick(portfolioItem){
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    // Método para eliminar un elemento del portafolio
    handleDeleteClick(portfolioItem){
        axios.delete(`https://isradev.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
        {withCredentials: true}).then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => { 
                    // Devolvemos todos los elementos menos el que hemos eliminado
                    return item.id !== portfolioItem.id
                })
            });
            this.getPortfolioItems();
        }).catch(error => {
            console.log("error delete", error);
        });
    }  

    // Metodo para manejar la edicion de un elemento del portafolio
    handleEditFormSubmision(){
        this.getPortfolioItems();
    }

    handleNewFormSubmision(portfolioItem){
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
                    handleNewFormSubmision={this.handleNewFormSubmision}
                    handleEditFormSubmision={this.handleEditFormSubmision}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                    clearPortfolioToEdit={this.clearPortfolioToEdit}
                    portfolioToEdit={this.state.portfolioToEdit}
                />
            </div>

            <div className='right-column'>
                <PortfolioSidebarList 
                data={this.state.portfolioItems} 
                handleDeleteClick={this.handleDeleteClick}
                handleEditClick={this.handleEditClick}
                />
            </div>
        </div>

    );
    }  
}
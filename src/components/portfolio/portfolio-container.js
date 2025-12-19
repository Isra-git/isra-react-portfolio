import React, { Component } from 'react';
import PortfolioItem from './portfolio-item';

import axios from 'axios';

export default class PortfolioContainer extends Component {
  //Constructor de la clase
  constructor() {
    //Hay que llamar al constructor de la clase padre (component)
    super();

    this.state = {
      pageTitle: 'Welcome to my portfolio',
      isLoading: false,
      data: [],
      allData: [], //copia de todos los datos para poder filtrar despues
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.allData.filter(item => {
        return item.category === filter;
      }),
    });
  }

  //Loop over data
  portfolioItems() {
    return this.state.data.map(item => {
      return (
        <PortfolioItem
          key={item.id} //key es un atributo especial que usa react para identificar cada elemento de una lista
          item={item} //pasamos el objeto completo al componente PortfolioItem
        />
      );
    });
  }

  getPortfolioItems() {
    // Make a request for a user
    axios
      .get('https://isradev.devcamp.space/portfolio/portfolio_items')

      .then(response => {
        // handle success
        this.setState({
          data: response.data.portfolio_items,
          allData: response.data.portfolio_items, //guardamos una copia de todos los datos para poder filtrar despues
        });
      })

      .catch(error => {
        // handle error
        console.log(error);
      })

      .finally(() => {
        // always executed
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="hero-wrapper">
        <div className="portfolio-filter-buttons">
          <button className="btn" onClick={() => this.setState({ data: this.state.allData })}>
            Todos
          </button>
          <button className="btn" onClick={() => this.handleFilter('education')}>
            Educación
          </button>
          <button className="btn" onClick={() => this.handleFilter('Technology')}>
            Tecnología
          </button>
          <button className="btn" onClick={() => this.handleFilter('social media')}>
            Social Media
          </button>
        </div>

        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}

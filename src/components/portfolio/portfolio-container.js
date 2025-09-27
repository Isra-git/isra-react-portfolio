import React, { Component } from 'react';
import PortfolioItem from "./portfolio-item";

import axios from 'axios';

export default class PortfolioContainer extends Component {
    
    //Constructor de la clase
    constructor(){
        
        //Hay que llamar al constructor de la clase padre (component)
        super();

       this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: []
    };

    this.handleFilter = this.handleFilter.bind(this);
  
}

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

    
    //Loop over data
    portfolioItems() {
        
        return this.state.data.map((item) => {
            return <PortfolioItem  
            key={item.position}
            position={item.position}
            name={item.name} 
            category={item.category}
            url={item.url}/>;
        })

    }

      getPortfolioItems() {
    // Make a request for a user 
    axios.get('https://isradev.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        console.log(response);
        this.setState({
          data: response.data.portfolio_items
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(() =>{
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
      <div>
        <h2>{this.state.pageTitle}</h2>

        <button onClick={() => this.handleFilter("eCommerce")}>
          eCommerce
        </button>
        <button onClick={() => this.handleFilter("Scheduling")}>
          Scheduling
        </button>
        <button onClick={() => this.handleFilter("Enterprise")}>
          Enterprise
        </button>

        {this.portfolioItems()}
      </div>
    );
    }
}
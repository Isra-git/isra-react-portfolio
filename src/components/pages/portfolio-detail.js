import axios from 'axios';
import React, { Component } from 'react';

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      description: '',
      url: '',
      category: '',
      thumb_image: '',
      banner_image: '',
      logo: '',
      isLoading: false,
    };
  }

  // metodo para pedir los datos del portfolio
  getPortfolioDetail(id) {
    // mostramos el spinner de carga
    this.setState({
      isLoading: true,
    });

    // manejamos la peticion
    axios
      .get(
        `
    https://isradev.devcamp.space/portfolio/portfolio_items/${id}`,
        { withCredentials: true }
      )
      .then(response => {
        console.log('respuesta: ', response);

        //desestructuramos la respuesta para el estado
        const {
          id,
          name,
          description,
          url,
          category,
          thumb_image_url,
          banner_image_url,
          logo_url,
        } = response.data.portfolio_item;

        // seteamos el estado
        this.setState({
          id: id,
          name: name,
          description: description,
          url: url,
          category: category,
          thumb_image: thumb_image_url,
          banner_image: banner_image_url,
          logo: logo_url,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log('Error: ', error);
        this.setState({ isLoading: false });
      });
  }

  // LLama a getPortfolioDetail al montar el componente
  componentDidMount() {
    // recibimos el id del portfolio
    const portofolio_solicitado_id = this.props.match.params.slug;
    this.getPortfolioDetail(portofolio_solicitado_id);
  }

  render() {
    return (
      <div>
        <h2>Estas en la pagina de: {this.state.name}</h2>
      </div>
    );
  }
}

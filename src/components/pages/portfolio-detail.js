import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import parse from 'html-react-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';

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
      <div className="project-card-container">
        <div className="project-card">
          {/* 1. HEADER: Banner Image */}
          <div
            className="project-banner"
            style={{ backgroundImage: `url(${this.state.banner_image})` }}
          >
            {/* Badge de categoría flotante */}
            <span className="category-badge">{this.state.category}</span>
          </div>

          {/* 2. BODY: Contenido superpuesto */}
          <div className="project-body">
            {/* 3. LOGO: Tecnica -> visual (Overlap) */}
            <div className="project-logo-wrapper">
              <img src={this.state.logo} alt={`${this.state.name} logo`} />
            </div>

            <div className="project-info">
              <div className="header-row">
                <h1>{this.state.name}</h1>
                {/* 4. URL: Botón de acción */}
                <a href={this.state.url} target="_blank" rel="noreferrer" className="btn-visit">
                  Visitar Sitio →
                </a>
              </div>

              {/* 5. DESCRIPTION */}
              <div className="description">{parse(this.state.description)}</div>
            </div>
          </div>
          <div className="portfolio-back-wrapper">
            <Link to="/">
              <FontAwesomeIcon icon={faCircleLeft} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

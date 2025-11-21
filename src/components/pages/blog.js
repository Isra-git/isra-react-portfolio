import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BlogItem from '../blog/blog-item';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Blog extends Component {
  constructor() {
    super();

    // estado inicial (arrayBlogsItems/numeroEntradas/pagina)
    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 1,
      isLoading: true,
    };

    // cerrojo para no cargar dos veces la misma coleccion de entradas del blog
    this.isFetching = false;

    // bindeamos las funciones
    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  // controla -> scroll infinito
  onScroll() {
    // si el nº de pagina coincide con la ultima, o esta 'cargando' mas no solicita mas registros
    if (this.isFetching || this.state.blogItems.length === this.state.totalCount) {
      console.log(
        `isFetching:${this.isFetching}
        `,
        `itemsLenght:${this.state.blogItems.length}`,
        `totalCount:${this.state.totalCount}`
      );

      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight //- 5
    ) {
      this.getBlogItems();
    }
  }

  //devuelve los blogItems desde la api
  getBlogItems() {
    // comprovamos el cerrojo
    if (this.isFetching) {
      return;
    }

    // volvemos a hechar el cerrojo / guardamos nº pagina
    this.isFetching = true;
    const currentPage = this.state.currentPage;

    // actualizamos la ui
    this.setState({
      isLoading: true,
    });

    axios
      //backend devuelve los articulos de 10 en 10 -> para solicitar mas registros params->page
      .get(`https://isradev.devcamp.space/portfolio/portfolio_blogs?page=${currentPage}`, {
        withCredentials: true,
      })
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,
          isLoading: false,
          currentPage: currentPage + 1,
        });

        // abrimos el cerrojo
        this.isFetching = false;
      })
      .catch(error => {
        console.log('getBlogItems :', error);
        this.setState({ isLoading: false });
      });
  }

  // al montar el componente
  componentDidMount() {
    this.getBlogItems();
    window.addEventListener('scroll', this.onScroll, false);
  }

  // al desmontar el componente-->
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    // creamos una copia de los datos
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return (
      <div className="blog-container">
        <div className="content-container">{blogRecords}</div>

        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Blog;

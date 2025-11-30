// componente que muestra una entrada concreta del blog

import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BlogFeaturedImage from '../blog/blog-featured-image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

/* Version Librerias para el parser de html a string y vicersa

- html-react-parser@3.0.4
- htmlparser2@8.0.1

*/

import parse from 'html-react-parser';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recuperamos el id del blog de la url a traves de los props (automatico)
      currentId: this.props.match.params.slug,
      blogItem: {},
    };
  }

  // Conseguimos la info de la entrada(id) del blog que queremos
  getBlogItems() {
    axios
      .get(`https://isradev.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
      .then(response => {
        this.setState({
          blogItem: response.data.portfolio_blog,
        });
      })
      .catch(error => {
        console.log('getBlogItems error: ', error);
      });
  }

  // al montar el componente
  componentDidMount() {
    this.getBlogItems();
  }

  render() {
    console.log('current id:', this.state.currentId);
    const { title, content, featured_image_url, blog_status } = this.state.blogItem;

    return (
      <div className="blog-container">
        <div className="content-container">
          <h1> {title}</h1>
          <BlogFeaturedImage featured_image_url={featured_image_url} />
          {/* Espera a que se renderice el componente para parsear el html  */}
          {content && <div className="content">{parse(content)}</div>}
        </div>
        <div className="blog-back-wrapper">
          <Link to="/blog">
            <FontAwesomeIcon icon={faCircleLeft} />
          </Link>
        </div>
      </div>
    );
  }
}

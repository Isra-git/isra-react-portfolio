// componente que muestra una entrada concreta del blog

import axios from 'axios';
import React, { Component } from 'react';

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

          <div className="featured-image-wrapper">
            <img src={featured_image_url} />
          </div>

          <div className="content">{content}</div>
        </div>
      </div>
    );
  }
}

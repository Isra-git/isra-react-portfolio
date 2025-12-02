// componente para el formulario de nuevos blogs (en modal)

import React, { Component } from 'react';
import axios from 'axios';
import ImageDropzone from '../portfolio/ImageDropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      blog_status: '',
      content: '',
      featured_image: null,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
  }

  //maneja el componente imageDropzone para select la imagen del blog
  handleFileSelect = file => {
    this.setState({ featured_image: file });
  };
  handleRemoveFile = () => {
    this.setState({ featured_image: null });
  };

  // maneja los cambios en el editor de texto DraftJS
  handleRichTextEditorChange(content) {
    this.setState({ content }); // content:content
  }

  // constructor del formularios
  buildForm() {
    let formData = new FormData();
    formData.append('portfolio_blog[title]', this.state.title);
    formData.append('portfolio_blog[blog_status]', this.state.blog_status);
    formData.append('portfolio_blog[content]', this.state.content);

    if (this.state.featured_image) {
      formData.append('portfolio_blog[featured_image]', this.state.featured_image);
    }
    return formData;
  }

  //maneja el envio del formularios
  handleSubmit(event) {
    this.setState({ isLoading: true }, () => {
      this.setState({
        title: '',
        blog_status: '',
        content: '',
        featured_image: null,
      });
    });
    axios
      .post('https://isradev.devcamp.space/portfolio/portfolio_blogs', this.buildForm(), {
        withCredentials: true,
      })
      .then(response => {
        this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log('Handle submit err: ', error);
        this.setState({ isLoading: false });
      });

    event.preventDefault();
  }

  //cambios en el form -> fija el estado
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        {/* <div className="modal-title">Nuevo Blog</div> */}
        <div className="two-column">
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="Blog Title"
            value={this.state.title}
          />

          <input
            type="text"
            name="blog_status"
            onChange={this.handleChange}
            placeholder="Blog Status"
            value={this.state.blog_status}
          />
        </div>

        <div className="one-column editor-content">
          <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} />
        </div>
        <div className="two-column-blog">
          <div className="image-blog">
            <ImageDropzone
              label="Imagen destacada"
              onFileSelect={this.handleFileSelect}
              onRemove={this.handleRemoveFile}
              imageUrl={this.state.featured_image_url}
            />
          </div>
          {this.state.isLoading ? (
            <div className="content-loader">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : null}
          <div className="btn-blog-modal">
            <button className="btn">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

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
      apiUrl: 'https://isradev.devcamp.space/portfolio/portfolio_blogs',
      apiAction: 'post',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id,
        title: this.props.blog.title,
        blog_status: this.props.blog.blog_status,
        content: this.props.blog.content,
        apiUrl: `https://isradev.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
        apiAction: 'patch',
      });
    }
  }

  // maneja la eliminacion de la imagen del blog, en modo edicion
  deleteImage(imageType) {
    const { id } = this.state;

    if (!id) {
      console.warn(`No se puede eliminar ${imageType} porque el ID es undefined.`);
      return;
    }

    axios
      .delete(
        `https://isradev.devcamp.space/portfolio/delete-portfolio-blog-image/${id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(response => {
        // Limpia el estado para que el dropzone quede vacío
        this.setState({ featured_image: null });
        // llamanos a la funcion del componente {blogDetail} para que se actualice
        this.props.handleFeaturedImageDelete(); //AÑADIDO
      })
      .catch(error => {
        console.log('deleteImage error', error);
      });
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

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true,
    })
      .then(response => {
        if (this.props.editMode) {
          // actualizamos el blog
          this.setState({ isLoading: false });
          this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
        } else {
          this.setState({ isLoading: false });
          this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
        }
        //SACADO DEL IF/ELSE
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
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={
              this.props.editMode && this.props.blog.content ? this.props.blog.content : null
            }
          />
        </div>
        <div className="two-column-blog">
          <div className="image-blog">
            {/* gestiona el modo edicion para la imagen featured_image_url  */}

            {this.props.editMode && this.props.blog.featured_image_url ? (
              <ImageDropzone
                label="Edit Image"
                onFileSelect={this.handleFileSelect}
                onRemove={() => this.deleteImage('featured_image')}
                imageUrl={this.props.blog.featured_image_url || null}
              />
            ) : (
              <ImageDropzone
                label="Main Image"
                onFileSelect={this.handleFileSelect}
                onRemove={this.handleRemoveFile}
                imageUrl={null} //{this.state.featured_image_url}
              />
            )}
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

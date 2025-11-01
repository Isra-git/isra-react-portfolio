import React, { Component } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      category: 'Technology',
      position: '',
      url: '',
      thumb_image: null,
      banner_image: null,
      logo: null,
      thumb_image_url: '',
      banner_image_url: '',
      logo_url: '',
      editMode: false,
      id: null,
      apiURl: 'https://isradev.devcamp.space/portfolio/portfolio_items',
      apiAction: 'post',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  handleImageDrop(imageType, file) {
    this.setState({
      [imageType]: file,
    });
  }

  deleteImage(imageType) {
    const { id } = this.state;

    if (!id) {
      console.warn(`No se puede eliminar ${imageType} porque el ID es undefined.`);
      return;
    }

    axios
      .delete(
        `https://isradev.devcamp.space/portfolio/delete-portfolio-image/${id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          [`${imageType}_url`]: '',
          [imageType]: null,
        });
      })
      .catch(error => {
        console.log('deleteImage error', error);
      });
  }

  buildForm() {
    let formData = new FormData();

    formData.append('portfolio_item[name]', this.state.name);
    formData.append('portfolio_item[description]', this.state.description);
    formData.append('portfolio_item[category]', this.state.category);
    formData.append('portfolio_item[position]', this.state.position);
    formData.append('portfolio_item[url]', this.state.url);

    if (this.state.thumb_image) {
      formData.append('portfolio_item[thumb_image]', this.state.thumb_image);
    }

    if (this.state.banner_image) {
      formData.append('portfolio_item[banner_image]', this.state.banner_image);
    }

    if (this.state.logo) {
      formData.append('portfolio_item[logo]', this.state.logo);
    }

    return formData;
  }

  componentDidUpdate() {
    if (this.props.portfolioToEdit && this.props.portfolioToEdit.id) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        banner_image_url,
        logo_url,
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        id,
        name: name || '',
        description: description || '',
        category: category || 'Technology',
        position: position || '',
        url: url || '',
        thumb_image_url: thumb_image_url || '',
        banner_image_url: banner_image_url || '',
        logo_url: logo_url || '',
        thumb_image: null,
        banner_image: null,
        logo: null,
        editMode: true,
        apiURl: `https://isradev.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: 'patch',
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiURl,
      data: this.buildForm(),
      withCredentials: true,
    })
      .then(response => {
        if (this.state.editMode) {
          this.props.handleEditFormSubmision();
        } else {
          this.props.handleNewFormSubmision(response.data.portfolio_item);
        }

        this.setState({
          name: '',
          description: '',
          category: 'Technology',
          position: '',
          url: '',
          thumb_image: null,
          banner_image: null,
          logo: null,
          thumb_image_url: '',
          banner_image_url: '',
          logo_url: '',
          editMode: false,
          id: null,
          apiURl: 'https://isradev.devcamp.space/portfolio/portfolio_items',
          apiAction: 'post',
        });

        [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
          if (ref.current) {
            ref.current.clearDropzone();
          }
        });
      })
      .catch(error => {
        console.log('error submit ', error);
      });

    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="one-column titulo-form">
          <h2>Añade nuevos proyectos a tu portfolio :</h2>
        </div>

        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="Technology">Technology</option>
            <option value="social media">Social Media</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="one-column">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="dropzone-group three-column">
          <ImageDropzone
            ref={this.thumbRef}
            label="Thumbnail"
            imageUrl={this.state.thumb_image_url}
            onFileSelect={file => this.handleImageDrop('thumb_image', file)}
            onRemove={() => this.deleteImage('thumb_image')}
          />
          <ImageDropzone
            ref={this.bannerRef}
            label="Banner"
            imageUrl={this.state.banner_image_url}
            onFileSelect={file => this.handleImageDrop('banner_image', file)}
            onRemove={() => this.deleteImage('banner_image')}
          />
          <ImageDropzone
            ref={this.logoRef}
            label="Logo"
            imageUrl={this.state.logo_url}
            onFileSelect={file => this.handleImageDrop('logo', file)}
            onRemove={() => this.deleteImage('logo')}
          />
        </div>

        <div className="btn-form-wrapper">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}

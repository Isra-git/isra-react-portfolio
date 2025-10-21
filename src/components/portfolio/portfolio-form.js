// componente de clase react 16
import React, { Component } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone';


export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    // estado inicial del formulario
    this.state = {
      name: "",
      description: "",
      category: "Technology",
      position: "",
      url: "",
      thumb_image: null,
      banner_image: null,
      logo: null // ← usamos "logo" como en el backend del curso
    };

    // enlazar los métodos
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);

    // referencias para las Dropzones, limpiar los datos después de enviar el formulario
    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  // Este método se llama cuando se selecciona una imagen desde Dropzone
  handleImageDrop(imageType, file) {
    this.setState({ [imageType]: file });
  }

  // Creamos el objeto que va a envolver los datos del formulario con imágenes para enviarlo al backend
  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);
    formData.append("portfolio_item[url]", this.state.url);

    // Adjuntamos las imágenes si existen
    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo); // ← nombre correcto para el backend
    }

    return formData;
  }

  // métodos para manejar cambios y envíos del formulario
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post(
      "https://isradev.devcamp.space/portfolio/portfolio_items",
      this.buildForm(),
      { withCredentials: true }
    )
      .then(response => {
        this.props.handleSuccessfullFormSubmision(response.data.portfolio_item);

        // Resetear el estado del formulario
        this.setState({
          name: "",
          description: "",
          category: "Technology",
          position: "",
          url: "",
          thumb_image: null,
          banner_image: null,
          logo: null
        });

        // Limpiar el componente Dropzone del formulario
        [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
          if (ref.current) {
            ref.current.clearDropzone();
          }
        });
      })
      .catch(error => {
        console.log("error submit ", error);
      });

    event.preventDefault();
  }

  render() {
    return (
        
        <form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
        <div className='one-column titulo-form'>
            <h2>Añade nuevos proyectos a tu portfolio :</h2>
        </div>
          <div className='two-column'>
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

          <div className='two-column'>
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
              className='select-element'
            >
              <option value="Technology">Technology</option>
              <option value="social media">Social Media</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className='one-column'>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="dropzone-group three-column">
            {/* Dropzones para imágenes */}
            <ImageDropzone
              ref={this.thumbRef}
              label="Thumbnail"
              onFileSelect={(file) => this.handleImageDrop("thumb_image", file)}
            />
            <ImageDropzone
              ref={this.bannerRef}
              label="Banner"
              onFileSelect={(file) => this.handleImageDrop("banner_image", file)}
            />
            <ImageDropzone
              ref={this.logoRef}
              label="Logo"
              onFileSelect={(file) => this.handleImageDrop("logo", file)} // ← usamos "logo"
            />
          </div>

          <div className='btn-form-wrapper'>
            <button 
            type="submit"
            className='btn'
            >Save</button>
          </div>
        </form>
      
    );
  }
}
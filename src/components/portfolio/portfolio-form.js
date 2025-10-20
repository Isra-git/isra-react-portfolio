//componente de clase react 16
import React, { Component } from 'react';
import axios from 'axios';
import ImageDropzone from './ImageDropzone'; 

export default class PortfolioForm extends Component {
    constructor(props){
        super(props);   
        
        // estado inicial del formulario
        this.state = {
          name: "",
          description: "",
          category: "Technology",
          position: "",
          url: "",
          thumb_image_url: null,
          banner_image_url: null,
          logo_image_url: null   
                
        };

        // enlazar los métodos
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);

    }

     // Este método se llama cuando se selecciona una imagen desde Dropzone
      handleImageDrop(imageType, file) {
        this.setState({ [imageType]: file });
  }


    // Creamos el objeto que va a envolver los datos del formulario
    // con imagenes para enviarlo al backend
    buildForm(){

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
        if (this.state.logo_image) {
        formData.append("portfolio_item[logo_image]", this.state.logo_image);
        }

    
        return formData;
    }


    // métodos para manejar cambios y envíos del formulario
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        // Enviar una solicitud post al backend (ruta, datos, opciones)
        axios.post(
            "https://isradev.devcamp.space/portfolio/portfolio_items",
            this.buildForm(), 
            {withCredentials: true})
        .then(response => {
            this.props.handleSuccessfullFormSubmision(response.data.portfolio_item);
        }).catch(error => {
            console.log("error submit ", error);
        });
        

        // prevenir el comportamiento por defecto del formulario
        event.preventDefault();
    }
    

    render() {
        return (
            <div>   
                <h1>Portfolio Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
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

                    <div>
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
                        >
                            <option value="Technology">Technology</option>
                            <option value="social media">Social Media</option>
                            <option value="education">Education</option>
                        </select>
                    </div>

                    <div>
                         <textarea
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                  
                    <div className="dropzone-group">
                    {/* Dropzones para imágenes */}
                    <ImageDropzone
                        label="Thumb Image"
                        onFileSelect={(file) => this.handleImageDrop("thumb_image", file)}
                    />
                    <ImageDropzone
                        label="Banner Image"
                        onFileSelect={(file) => this.handleImageDrop("banner_image", file)}
                    />
                    <ImageDropzone
                        label="Logo Image"
                        onFileSelect={(file) => this.handleImageDrop("logo_image", file)}
                    />

                    </div>

                    <div>
                        <button type="submit">Save</button>
                    </div>

                </form>
            </div>
        );
    }
}
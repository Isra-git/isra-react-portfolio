// ImageDropzone.js
import React from 'react';
import { useDropzone } from 'react-dropzone';

// Este componente funcional encapsula el hook useDropzone
// y se comunica con el componente padre a través de props
export default function ImageDropzone({ onFileSelect, label }) {
  // Configuramos el hook para aceptar solo imágenes JPEG y PNG
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Cuando se suelta un archivo, lo enviamos al padre
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]); // solo tomamos el primero
      }
    }
  });

    
  return (
    <div className="dropzone-box">
      <label className="dropzone-label">{label}</label>
      <div
        {...getRootProps()}
        className={`dropzone-area ${isDragActive ? 'active' : ''}`}

      >
        <input {...getInputProps()} />
        <p className="dropzone-text">{isDragActive ? "Suelta la imagen aquí..." : "Arrastra o haz clic para subir una imagen"}</p>
      </div>
    </div>
  );
}
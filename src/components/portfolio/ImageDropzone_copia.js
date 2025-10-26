// ImageDropzone.js
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useDropzone } from 'react-dropzone';

// Importamos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';

// Componente funcional con forwardRef para exponer métodos al padre
const ImageDropzone = forwardRef(({ onFileSelect, label }, ref) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        if (onFileSelect) onFileSelect(file);
      }
    }
  });

  // Método para eliminar la imagen seleccionada
  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (onFileSelect) onFileSelect(null);
  };

  // Exponemos el método clearDropzone al componente padre
  useImperativeHandle(ref, () => ({
    clearDropzone() {
      handleRemove();
    }
  }));

  // Liberamos la URL de la imagen cuando se desmonta
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="dropzone-box">
      <label className="dropzone-label">{label}</label>
      <div
        {...getRootProps()}
        className={`dropzone-area ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <div className="dropzone-preview-inline">
            <img
              src={previewUrl}
              alt="Previsualización"
              className="dropzone-image"
            />
            <button
              type="button"
              className="dropzone-remove-button"
              onClick={(e) => {
                e.stopPropagation(); // evita que se active la búsqueda de archivos
                handleRemove();
              }}
            >
              Eliminar imagen
            </button>
          </div>
        ) : (
          <div className="dropzone-text">
            <div className="dropzone-icon">
              <FontAwesomeIcon
                icon={faFileImage}
                style={{
                  color: '#9cd289',
                  fontSize: '2.5rem',
                  marginBottom: '8px'
                }}
              />
              <FontAwesomeIcon
                icon={faFileImage}
                style={{
                  color: '#9cd289',
                  fontSize: '2.5rem',
                  marginBottom: '8px'
                }}
              />
            </div>
            <p>
              PNG – JPG<br />
              {isDragActive
                ? 'Suelta la imagen aquí...'
                : 'Arrastra o haz clic para subir una imagen'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

export default ImageDropzone;
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useDropzone } from 'react-dropzone';

// Importamos FontAwesome para iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';

// Componente funcional con forwardRef para exponer métodos al padre
// Ahora acepta una prop adicional: imageUrl (para mostrar imagen existente en modo edición)
const ImageDropzone = forwardRef(({ onFileSelect, label, imageUrl }, ref) => {
  // Estado para el archivo seleccionado desde Dropzone
  const [selectedFile, setSelectedFile] = useState(null);

  // Estado para la URL de previsualización (puede venir de Dropzone o del backend en modo edición)
  const [previewUrl, setPreviewUrl] = useState(imageUrl || null);

    // Si recibimos una imagen desde el backend (modo edición) y no hay imagen nueva seleccionada,
  // actualizamos la preview para mostrar esa imagen
    useEffect(() => {
      if (imageUrl && !selectedFile) {
        setPreviewUrl(imageUrl);
      }
    }, [imageUrl]);

  // Configuración de Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Si se selecciona una imagen, actualizamos el estado y notificamos al padre
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file); // Creamos URL temporal para mostrar preview
        setPreviewUrl(objectUrl);
        if (onFileSelect) onFileSelect(file); // Enviamos el archivo al padre
      }
    }
  });

  // Método para eliminar la imagen seleccionada o la imagen inicial del backend
  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (onFileSelect) onFileSelect(null); // Notificamos al padre que se ha eliminado
  };

  // Exponemos el método clearDropzone al componente padre (PortfolioForm)
  useImperativeHandle(ref, () => ({
    clearDropzone() {
      handleRemove();
    }
  }));

  // Liberamos la URL temporal si se desmonta el componente
  useEffect(() => {
    return () => {
      // Solo liberamos si es una URL generada por Dropzone (no del backend)
      if (previewUrl && selectedFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

  return (
    <div className="dropzone-box">
      {/* Etiqueta del campo */}
      <label className="dropzone-label">{label}</label>

      {/* Área interactiva de Dropzone */}
      <div
        {...getRootProps()}
        className={`dropzone-area ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />

        {/* Si hay imagen (de Dropzone o del backend), la mostramos */}
        {previewUrl ? (
          <div className="dropzone-preview-inline">
            <img
              src={previewUrl}
              alt="Previsualización"
              className="dropzone-image"
            />
            {/* Botón para eliminar la imagen */}
            <button
              type="button"
              className="dropzone-remove-button"
              onClick={(e) => {
                e.stopPropagation(); // Evita que se abra el selector de archivos al hacer clic
                handleRemove();
              }}
            >
              Eliminar imagen
            </button>
          </div>
        ) : (
          // Si no hay imagen, mostramos el área de carga
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
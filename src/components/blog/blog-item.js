// componente que renderiza el blog

import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import striptags from 'striptags';
import Truncate from 'react-truncate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

const BlogItem = props => {
  const { id, blog_status, content, title, featured_image_url } = props.blogItem;

  // const truncateAtSpace = (text, limit = 320) => {
  //   // si content es null-> devuelve un valor por defecto
  //   if (!text || typeof text != 'string') {
  //     text = 'Parece que algo no ha ido bien';
  //     return text;
  //   }

  //   // Busca el primer espacio después del carácter 220
  //   const index = text.indexOf(' ', limit);

  //   // Si encuentra un espacio, corta hasta ahí
  //   if (index !== -1) {
  //     return text.slice(0, index) + '...';
  //   }

  //   // Si no hay espacio después del límite, corta directamente en 220
  //   return text.slice(0, limit) + '...';
  // };

  return (
    <div className="blog-content-wrapper">
      <div className="blog-item-title">
        <div>
          <FontAwesomeIcon icon={faBlog} />
        </div>
        <div>
          <Link to={`/b/${id}`}>
            <h1>{title}</h1>
          </Link>
        </div>
      </div>
      {/* Resume el contenido del blog a {n} lines y añade un enlace "..." al blog*/}
      <Truncate
        lines={4}
        ellipsis={
          <span>
            <Link to={`/b/${id}`}>...</Link>
          </span>
        }
      >
        {content && <div>{striptags(content)}</div>}
      </Truncate>
      {/* <div className="line-wrapper">
        <hr />
      </div> */}
    </div>
  );
};

export default BlogItem;

import React from 'react';

export default function NoMatch() {
  return (
    <div className="no-match">
      <div className="no-match__card">
        <h1 className="no-match__title">404</h1>
        <p className="no-match__message">Lo sentimos, la página que buscas no existe.</p>
        <a href="/" className="no-match__button">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

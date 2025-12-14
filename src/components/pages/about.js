import React from 'react';

import aboutImg from '../../../static/assets/images/about/about.jpg';

export default function About() {
  return (
    <div className="about-wrapper">
      <div
        className="left-wrapper"
        style={{
          backgroundImage: `url(${aboutImg})`,
        }}
      >
        <div className="left-silk">
          <h1>About Me</h1>
        </div>
      </div>
      <div className="right-wrapper">
        <section className="about-me">
          {/* <h1 className="title">Sobre mí</h1> */}
          <p className="intro">
            Soy <strong>israDev</strong>, un <em>junior developer</em> motivado, curioso y con ganas
            de aportar ideas frescas. Me apasiona aprender, experimentar y construir aplicaciones
            que sean útiles, seguras y visualmente atractivas.
          </p>

          <section className="education-section">
            <h2 className="subtitle">🛠️ Mi Stack Tecnológico</h2>
            <table className="studies-table">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Tecnologías</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cert-row">
                  {/* Usamos una clase de fila existente */}
                  <td data-label="Área">Frontend</td>
                  <td data-label="Tecnologías">React, JavaScript, Tailwind, CSS, SCSS, HTML</td>
                </tr>
                <tr className="fp-row">
                  {/* Usamos una clase de fila existente */}
                  <td data-label="Área">Backend</td>
                  <td data-label="Tecnologías">Python, Javascript, FastAPI, Node.js</td>
                </tr>
                <tr className="autodidacta-row">
                  {/* Usamos una clase de fila existente */}
                  <td data-label="Área">Bases de datos</td>
                  <td data-label="Tecnologías">MySQL, PostgreSQL, MongoDB</td>
                </tr>
                <tr className="bach-row">
                  {/* Usamos una clase de fila existente */}
                  <td data-label="Área">DevOps / Otros</td>
                  <td data-label="Tecnologías">Git, Linux, Docker, AWS, (conocimientos básicos)</td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* Formacion academica  */}
          <section className="education-section">
            <h2 className="subtitle">🎓 Formación Académica y Desarrollo</h2>
            <table className="studies-table">
              <thead>
                <tr>
                  <th>Tipo de Formación</th>
                  <th>Descripción / Certificación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cert-row">
                  <td data-label="Tipo">Certificado Profesional</td>
                  <td data-label="Descripción">
                    <a
                      href="https://bottega.edu/full-stack-development-certificate/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="study-link"
                    >
                      Full Stack Development Certificate (bootega University)
                    </a>
                  </td>
                </tr>
                <tr className="fp-row">
                  <td data-label="Tipo">Grado Superior (F.P.)</td>
                  <td data-label="Descripción">
                    <a
                      href="https://www.fpbidasoa.eus/es/ciclos/electronica/gs-sistemas-de-telecomunicaciones-e-informaticos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="study-link"
                    >
                      Sistemas de Informática y Telecomunicaciones
                    </a>
                  </td>
                </tr>
                <tr className="autodidacta-row">
                  <td data-label="Tipo">Desarrollo Continuo</td>
                  <td data-label="Descripción">
                    Formación autodidacta (Linux, Git, TypeScript, FastAPI, etc.)
                  </td>
                </tr>
                <tr className="bach-row">
                  <td data-label="Tipo">Estudios Previos</td>
                  <td data-label="Descripción">Bachillerato Tecnológico Industrial</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="subtitle">Mis fortalezas</h2>
            <ul className="strengths">
              <li>✅ Aprendiz metódico y curioso</li>
              <li>🛠️ Conocimientos solidos en hardware, montaje y reparación</li>
              <li>🎨 Pasión por el diseño frontend y efectos CSS elegantes</li>
              <li>🖥️ Conocimientos sobre Backend y arquitectura de sistemas </li>
              <li>🔒 Interés en seguridad digital y buenas prácticas</li>
              <li>📚 Documentación clara y trabajo en equipo</li>
            </ul>
          </section>

          <h2 className="subtitle">Objetivos</h2>
          <p>
            Mi meta es crecer como <strong>desarrollador full stack</strong>, integrando frontend y
            backend con buenas prácticas de despliegue, seguridad y documentación. A corto plazo,
            estoy enfocado en completar mi formación y en desarrollar un proyecto capstone que
            refleje mi estilo y mis valores como profesional.
          </p>

          <p className="closing">
            🚀 En pocas palabras: soy un junior developer moderno, motivado y creativo, listo para
            transformar ideas en realidades digitales.
          </p>
        </section>
      </div>
    </div>
  );
}

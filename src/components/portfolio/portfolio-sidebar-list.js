import React from "react";

import { FaTrash, FaEdit, FaFolderOpen, FaTags } from "react-icons/fa";

const PortfolioSidebarList = (props) => {
  const portfolioList = props.data.map((portfolioItem) => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={portfolioItem.thumb_image_url} alt="" />
        </div>

        <div className="portfolio-info">
            <div className="info-line">
                <span className="info-block">
                    <FaFolderOpen className="carpeta"/>
                <span>{portfolioItem.name}</span>
                </span>
            </div>
            <div className="info-line">
                <span className="info-block">
                <FaTags className="etiqueta"/>
                <span>{portfolioItem.category}</span>
                </span>
            </div>
            </div>

        <div className="portfolio-actions">
          <button
            className="icon-button"
            onClick={() => props.handleDeleteClick(portfolioItem)}
          >
            <FaTrash />
          </button>
          <button className="icon-button">
            <FaEdit />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="portfolio-sidebar-list-wrapper">
      {portfolioList}
    </div>
  );
};

export default PortfolioSidebarList;
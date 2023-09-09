import React from 'react';
import './SellerButton.css'; // Importez le fichier CSS pour le style du bouton

const SellerButton = ({ imageUrl, onClick, children }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt="Image" className="button-image" />}
      {children}
    </button>
  );
}

export default SellerButton;

  
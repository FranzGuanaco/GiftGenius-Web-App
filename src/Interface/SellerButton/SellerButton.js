import React from 'react';
import './SellerButton.css'; // Importez le fichier CSS pour le style du bouton

const SellerButton = ({ imageUrl, onClick, children, width, height, autoMargin }) => {
  return (
    <button className="custom-button" onClick={onClick} 
    style={{width: width, height: height, margin: autoMargin ? 'auto' : undefined }}>
      {imageUrl && <img src={imageUrl} alt="Image" className="button-image" />}
      {children}
    </button>
  );
}

SellerButton.propTypes = {
  width: "600px",
  height: "405px",
  autoMargin: false 
};

export default SellerButton;

  
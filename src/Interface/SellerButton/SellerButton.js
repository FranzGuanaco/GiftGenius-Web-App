import React from 'react';
import './SellerButton.css'; // Importez le fichier CSS pour le style du bouton

const SellerButton = ({ imageUrl, Link, ClickLink, children, width, height, autoMargin }) => {
  return (
    <button className="custom-button" id={Link} onClick={ClickLink} 
    style={{width: width, height: height, margin: autoMargin ? 'auto' : undefined }}>
      {imageUrl && <img src={imageUrl} alt="Image" className="button-image" />}
      {children}
    </button>
  );
}

SellerButton.propTypes = {
  width: "600px",
  height: "405px",
  autoMargin: false, 
};

SellerButton.defaultProps = {
  children: ""
};

export default SellerButton;

  
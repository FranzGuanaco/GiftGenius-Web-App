import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS

const ProductBox = ({ imageUrl }) => {
  return (
    <div className="square">
      <img src={imageUrl} alt="Votre image" className="square-image" />
    </div>
  );
}

export default ProductBox;

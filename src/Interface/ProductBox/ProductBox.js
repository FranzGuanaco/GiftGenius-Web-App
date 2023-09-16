import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS
import SellerButton from '../SellerButton/SellerButton'; // Importez le composant SellerButton depuis son fichier

const ProductBox = ({ imageUrl, productName, shortDescription }) => {
  return (
    <div>
      <div className="square">
        <img src={imageUrl} alt="Votre image" className="square-image" />
      </div>
      <div className="DescriptionStyle">
        <p>{productName} {shortDescription}</p>
      </div>
      <div className="SellerStyle" style={{ paddingTop: "1%"}}>
        <SellerButton style={{ width: "44px" }} /> 
      </div>
    </div>
  );
}

ProductBox.defaultProps = {
  productName: "Nom:",
  shortDescription: "Courte description par défaut"
};

export default ProductBox;



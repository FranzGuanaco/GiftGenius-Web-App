import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS
import SellerButton from '../SellerButton/SellerButton'; // Importez le composant SellerButton depuis son fichier

const ProductBox = ({ imageUrl, productName, shortDescription, display, width, height, onclick }) => {
  return (
    <div>
      <div className="square">
        <img src={imageUrl} alt="Votre image" className="square-image" onClick={onclick}/>
      </div>
      {display && (
      <div className="DescriptionStyle">
        <p>{productName} {shortDescription}</p>
      </div>
       )}
      {display && (
        <div className="SellerStyle" style={{ paddingTop: "1%" }}>
          <SellerButton width={"60px"} height={"30px"}/>
        </div>
      )}
    </div>
  );
}

ProductBox.defaultProps = {
  productName: "Nom:",
  shortDescription: "Courte description par défaut",
  display: false,
};

export default ProductBox;



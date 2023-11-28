import React from 'react';
import './ProductBoxDetails.css'; // Importez le fichier CSS
import SellerButton from '../SellerButton/SellerButton'; // Importez le composant SellerButton depuis son fichier

const ProductBoxDetails = ({ imageUrl, productName, shortDescription, display, width, height }) => {
    return (
        <div>
        <div className="square" style={{width: width, height: height}}>
          <img src={imageUrl} alt="Votre image" className="square-image" />
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
  
  
  ProductBoxDetails.defaultProps = {
    productName: "Nom:",
    shortDescription: "Courte description par défaut",
    display: false,
    width: "300px",
    height: "330px"
  };

export default ProductBoxDetails;

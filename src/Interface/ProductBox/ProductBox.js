import React from 'react';
import './ProductBox.css'; // Importez le fichier CSS
import SellerButton from '../SellerButton/SellerButton'; // Importez le composant SellerButton depuis son fichier

const ProductBox = ({ imageUrl, productName, shortDescription, display, Link, ClickLink, onclick }) => {
  return (
    <div>
      <div className="square">
       {/* afficher image */}
        <img src={imageUrl} alt="Votre image" className="square-image" onClick={onclick}/> 
      </div>
       {/* afficher le nom et la description */}
      {display && (
      <div className="DescriptionStyle">
        <p>{productName}</p> 
        
        <p>{shortDescription}</p>

      </div>
       )}
       {/* afficher le nom du vendeur */}
      {display && (
        <div className="SellerStyle" style={{ paddingTop: "1%" }}>
          <SellerButton width={"60px"} height={"30px"} id={Link} ClickLink={ClickLink} />
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



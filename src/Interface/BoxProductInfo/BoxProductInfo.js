import React from 'react';
import './ProductInfo.css'; 
import ProductInf from './ProductInf';
import SellerButton from '../SellerButton/SellerButton';

function BoxProductInfo({detailWidth}) {
  return (
    
        <div className='Boxdetails' style={{width: detailWidth}}>
        <h3 style={{ marginTop: '0' }}>Nom</h3>
        <h4>Description</h4>
        <h5>Site vendeurs:</h5>
        <SellerButton width={"60px"} height={"30px"} />
        <div className='ProductInf' style={{marginTop: '10%'}}>
        <ProductInf></ProductInf>
        </div>
    </div>
 
  );
}

BoxProductInfo.defaultProps = {
    detailWidth: "300px",
  };

export default BoxProductInfo;

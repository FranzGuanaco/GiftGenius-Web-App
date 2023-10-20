import React from 'react';
import ProductBox from '../ProductBox/ProductBox';


const Suggestion = () => {
  return (
    <div>
    <div style={{ borderBottom: '1px solid #ccc' }}>
     {/* Ligne grise */}
    </div>
    <div className="suggestion">
    <ProductBox width={"90px"} height={"100px"} />
    </div>
    </div>
  );
}

export default Suggestion;

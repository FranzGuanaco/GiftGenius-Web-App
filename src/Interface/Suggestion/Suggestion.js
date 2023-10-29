import React from 'react';
import ProductBox from '../ProductBox/ProductBox';


const Suggestion = () => {
  return (
    <div>
    <div style={{ borderBottom: '1px solid #ccc' }}>
     {/* Ligne grise */}
    </div>
    <div className="suggestion" style={{marginTop: "3%", marginLeft:"2%"}}>
    <ProductBox width={"200px"} height={"220px"} />
    </div>
    </div>
  );
}

export default Suggestion;

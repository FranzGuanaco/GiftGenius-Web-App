import React from 'react';
import Navbar from './Navbar/navbar';
import MenuBar from './MenuBar/MenuBar';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import BoxProductInfo from './BoxProductInfo/BoxProductInfo';


export default function Productdetails() {
  return (
    <div className='Productdetails'>
         <Navbar></Navbar>
         <NewsBox></NewsBox>
         <div className='page-container '>
         <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
         <div className="ProductBoxPosition" style={{ display: 'flex', marginLeft: "3%", alignItems: 'flex-start', position:'fixed'}}>
         <div className="TinyProductBoxPosition" style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
            <ProductBox width={"90px"} height={"100px"} />
            <div className="margin" style={{marginTop: "15%"}}>
            <ProductBox width={"90px"} height={"100px"} />
            </div>
            <div className="margin" style={{marginTop: "15%"}}>
            <ProductBox width={"90px"} height={"100px"} />
            </div>
            
            </div>
       
            <div className="largeProductBoxPosition" style={{ display: 'flex', marginLeft: "5%"}}>
            <ProductBox style={{ width: "44px", height: "110px" }} />
            </div>
            <div className="ProductBoxPosit" style={{marginLeft: "13%", alignItems: 'flex-start'}}>
        <BoxProductInfo detailWidth={"300px"}/>
        </div>
        </div>
        </div>
      </div>
    </div>
    
  );
}


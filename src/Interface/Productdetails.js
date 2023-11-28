import React from 'react';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import BoxProductInfo from './BoxProductInfo/BoxProductInfo';
import Suggestion from './Suggestion/Suggestion';
import ProductBoxDetails from './ProductBox/ProductBoxDetails';
import '../App.css';


export default function Productdetails() {
  return (
    <div className='Productdetails'>
      
         <Navbar width={"100%"} style={{ position: 'sticky', top: '0', zIndex: '100' }}></Navbar>
         <div className='page-NewsBox' style={{paddingTop: '70px'}}>
         <NewsBox width={"100%"} style={{ position: 'sticky'}}></NewsBox>
         </div>
         <div className='page-container'>
         <div className="MenuStyle" style={{ paddingTop: "35%", width: "44%", marginLeft:"5%"}}>
         <div className="ProductBoxPosition" style={{ display: 'flex', marginLeft: "3%", alignItems: 'flex-start', zIndex:'inherit'}}>
         <div className="TinyProductBoxPosition" style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
            <ProductBoxDetails width={"115px"} height={"132px"} />
            <div className="margin" style={{marginTop: "24%"}}>
            <ProductBoxDetails width={"115px"} height={"132px"} />
            </div>
            <div className="margin" style={{marginTop: "24%"}}>
            <ProductBoxDetails width={"115px"} height={"132px"} />
            </div>
            
            </div>
       
            <div className="largeProductBoxPosition" style={{ display: 'flex', marginLeft: "5%"}}>
            <ProductBoxDetails width={"400px"} height={"450px"}/>
            </div>
            <div className="ProductBoxPosit" style={{marginLeft: "13%", alignItems: 'flex-start'}}>
        <BoxProductInfo detailWidth={"80%"}/>
        </div>
        </div>
        </div>
      </div>
      <div className="SpaceSuggestion" style={{ marginTop: "60vh"}}></div>
      <Suggestion/>
    </div>
    
  );
}
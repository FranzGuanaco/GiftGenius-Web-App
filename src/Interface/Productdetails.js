import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import BoxProductInfo from './BoxProductInfo/BoxProductInfo';
import Suggestion from './Suggestion/Suggestion';
import ProductBoxDetails from './ProductBox/ProductBoxDetails';
import { useLocation } from 'react-router-dom';
import '../App.css';


export default function Productdetails() {

  const location = useLocation(); 
  const { message } = location.state || {};
  console.log(message)

  useEffect(() => {
    
    const fetchData = async () => {
      const nom_prod = message
      try {
        const response = await fetch('http://localhost:3001/api/description');
        const data = await response.json();
     
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className='Productdetails'>
      
         <Navbar MenuBar={false} width={"100%"} style={{ position: 'sticky', top: '0', zIndex: '100' }}></Navbar>
         <div className='page-NewsBox' style={{paddingTop: '70px'}}>
         <NewsBox width={"100%"} style={{ position: 'sticky'}}></NewsBox>
         </div>
         <div className='page-container'>
         <div className="MenuStyle" style={{ paddingTop: "50vh", width: "44%", marginLeft:"5%"}}>
         <div className="ProductBoxContainer" style={{padding: '10px'}}>
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
        <BoxProductInfo detailWidth={"300px"}/>
        </div>
        </div>
        </div>
        </div>
      </div>
      <div className="SpaceSuggestion" style={{ marginTop: "55vh"}}></div>
      <Suggestion/>
    </div>
    
  );
}
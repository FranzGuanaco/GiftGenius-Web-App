import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import Proposal from './Proposal';
import Productdetails from './Productdetails';
import Categorydetails from './Categorydetails';
import Navbar from './Navbar/navbar';
import MenuBar from './MenuBar/MenuBar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import SellerButton from './SellerButton/SellerButton';

export default function Homepage() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="NewsStyle" >
        <NewsBox />
      </div>
      <div className="MenuStyle" >
        <MenuBar/>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "7%", width: "44%" }}>
        <CategoryBox style={{width: "44px" }}/>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "3%", width: "44%", marginLeft:"2%" }}>
        <ProductBox style={{width: "44px" }}/>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "1%", marginLeft:"2%" }}>
        <SellerButton style={{width: "44px" }}/>
      </div>
      <div className="QuizButtonContainer" style={{ position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)"}}>
        <QuizButton />
      </div>
    </div>
  );
}




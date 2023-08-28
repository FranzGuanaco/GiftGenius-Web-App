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

export default function Homepage() {
  return (
 
      <div className="App">
        <div className="NavStyle" style={{paddingTop: "3%"}}>
        <Navbar/> 
        </div>
        <div className="MenuStyle" style={{paddingTop: "3%"}}>
        <MenuBar/>
        </div>
        <div className="MenuStyle" style={{paddingTop: "7%", width:"44%"}}>
        <CategoryBox/>
      </div>
      <div className='QuizbuttonStyle' style={{position:'fixed', marginLeft:'90%'}}>
      <QuizButton/>
      </div>
   
      </div>

  );
}



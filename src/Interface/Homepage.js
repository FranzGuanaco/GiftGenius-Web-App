import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import Proposal from './Proposal';
import Productdetails from './Productdetails';
import Categorydetails from './Categorydetails';
import Navbar from './Navbar/navbar';

export default function Homepage() {
  return (
 
      <div className="App">
        <Navbar/>
      </div>

  );
}



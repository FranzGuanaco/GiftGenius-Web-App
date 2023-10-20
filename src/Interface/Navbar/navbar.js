import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import account_icon from './account_icon.png'
import category_icon from './category_icon.png'
import favorite_icon from './favorite_icon.png'
import GiftGeniusLogo from './GiftGeniusLogo.png'
import './Navbar.css';
import Searchbar from './SearchBar';
import NewsBox from '../NewsBox/NewsBox';

function Navbar(props) {
    return (
        <nav className="navbar" style={{width: props.width}}>
            <div className="Logo" style={{paddingLeft: "10%"}}> 
            <img src={GiftGeniusLogo} alt="Accueil" style={{ width: '130px', position: "relative", top:"10%" }} />
            </div>
           <div className="navbar-center">
                <div className="position" style={{paddingLeft: "40%", position:"relative"}}>
                <Searchbar />
            </div>
            </div>
        <div className="left" style={{paddingRight: "10%"}}> 
    <ul className="navbar-list">
        <li className="navbar-item">
         <Link to="/">
         <img src={props.accountIcon} alt="Accueil" style={{ width: '30px' }} />
        </Link>
        </li>
        <li className="navbar-item">
         <Link to="/quiz">
         <img src={props.FavoriteIcon} alt="Quiz" style={{ width: '35px' }} />
         </Link>
        </li>
        <li className="navbar-item">
         <Link to="/result">
         <img src={props.categoryIcon} alt="Résultat" style={{ width: '30px' }} />
         </Link>
        </li>
        </ul>
        </div>
    </nav>

    );
}

Navbar.defaultProps = {
    accountIcon: account_icon,
    FavoriteIcon: favorite_icon,
    categoryIcon: category_icon,
    width: '1800px'
   
  }

export default Navbar;


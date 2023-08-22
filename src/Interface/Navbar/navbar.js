import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Homepage from '../Homepage';
import Quiz from '../Quiz';
import Proposal from '../Proposal';
import Productdetails from '../Productdetails';
import Categorydetails from '../Categorydetails';
import account_icon from './account_icon.png'
import category_icon from './category_icon.png'
import filter_icon from './filter_icon.webp'
import './Navbar.css';
import Searchbar from './SearchBar';

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item-center">
                    <Searchbar/>
                </li>
                <li className="navbar-item">
                    <Link to="/">
                        <img src={props.accountIcon} alt="Accueil" style={{ width: '30px' }}/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/quiz">
                        <img src={props.categoryIcon} alt="Quiz" style={{ width: '30px' }}/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/result">
                        <img src={props.filterIcon} alt="Résultat" style={{ width: '30px' }}/>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/result">
                        <img src={filter_icon} alt="Résultat" style={{ width: '30px' }}/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

Navbar.defaultProps = {
    accountIcon: account_icon,
    filterIcon: filter_icon,
    categoryIcon: category_icon,
   
  }

export default Navbar;


import {React, useState} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import account_icon from './account_icon.png'
import category_icon from './category_icon.png'
import favorite_icon from './favorite_icon.png'
import GiftGeniusLogo from './GiftGenius-G12.png'
import './Navbar.css';
import Searchbar from './SearchBar';
import NewsBox from '../NewsBox/NewsBox';
import MenuBar from '../MenuBar/MenuBar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';


function Navbar(props) {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
  
      setIsNavOpen(currentState => !currentState);
    };
    

  const closeNav = () => {
    setIsNavOpen(false);
  };


  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/')
    console.log('home')
};

  const goToLogin = () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      // L'utilisateur est connecté
      var email = user.email;
      var uid = user.uid;

      console.log(`${uid} et ${email}`);
      navigate('/account')
    } else {
      // L'utilisateur n'est pas connecté
      console.log('Utilisateur non connecté.');
      navigate('/login')
      console.log('logintest')
      }
    });
   return () => unsubscribe();
  };



  return (
    <>
    <nav className="navbar" style={{top: '0', zIndex: '100' }}>
      <div className="Logo" style={{ paddingLeft: '10%' }}>
        <img src={GiftGeniusLogo} alt="Accueil" style={{ width: '90px', position: 'relative', top: '1%' }} onClick={goToHomepage}/>
      </div>
      
      <div className="navbar-center">
        <div className="position" style={{ paddingLeft: '40%', position: 'relative' }}>
          <Searchbar />
        </div>
      </div>
      <div className="left" style={{ paddingRight: '10%' }}>
        <ul className="navbar-list">
          <li className="navbar-item">
      
              <img src={props.accountIcon} alt="Account" className="accountIcon" onClick={goToLogin}/>
       
          </li>
          <li className="navbar-item">
            <Link to="/quiz">
              <img src={props.FavoriteIcon} alt="Quiz" className="favoriteImg" />
            </Link>
          </li>
          <li className="navbar-item">
            <img src={props.categoryIcon} alt="Résultat" className="categoryIcon" onClick={openNav} />
          </li>
        </ul>
      </div>
    </nav>
    <div className='page-NewsBox'>
    <NewsBox width='100%'/>
    <div className='page-Box' style={{top:"20px"}}>
    {props.MenuBar && (
    <MenuBar width='100%'/>
    )}
    </div>
    </div>

    <span
      style={{
        fontSize: '30px',
        cursor: 'pointer',
        display: 'block',
        margin: '30px',
        marginTop: '50px',
        width: '10%',
      }}
   
    >
    </span>
    <div id="mySidenav" className={`sidenav ${isNavOpen ? 'open' : ''}`}>
      <a href="#" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <div className="align">
   
      </div>
    </div>
    </>
  );
}



Navbar.defaultProps = {
    accountIcon: account_icon,
    FavoriteIcon: favorite_icon,
    categoryIcon: category_icon,
    width: '1800px',
    MenuBar: true,
   
  }

export default Navbar;


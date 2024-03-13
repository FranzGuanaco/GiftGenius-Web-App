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
        <img src={GiftGeniusLogo} alt="Accueil" className="logo-img" onClick={goToHomepage}/>
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
  <div style={{ padding: '103px 0px 0px 70px', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <a href="#" className="closebtn" onClick={closeNav} style={{ textDecoration: 'none', color: 'inherit' }}>
        &times; {/* Close button */}
      </a>
      <h4 style={{ margin: '0', color:'##1b1b1b'}}>Catégories de cadeaux</h4>
    </div>
    {/* Additional content here */}
  </div>
  <div className="menu">
  <div className="Navbar-menu-item">
    <input type="checkbox" id="appliances-toggle" className="toggle substituted" aria-hidden="true" />
    <label htmlFor="appliances-toggle" className="label">
      <div className="arrow-container">
        <span className="arrow"></span>
      </div>
      <div class="checkbox-wrapper-1">
      <input id="example-1" class="substituted" type="checkbox" aria-hidden="true" />
      <label for="example-1">Categorie</label>
      </div>
    </label>
    <div className="submenu">
      <div className="submenu-item">
        <div className="checkbox-wrapper-1">
          <input id="example-1" className="substituted" type="checkbox" aria-hidden="true" />
          <label htmlFor="example-1"> Sous Categorie</label>
        </div>
      </div>
      <div className="submenu-item">
        <div className="checkbox-wrapper-1">
          <input id="example-2" className="substituted" type="checkbox" aria-hidden="true" />
          <label htmlFor="example-2">Sous Sous cat</label>
        </div>
        <div className="sub-submenu">
          <div className="sub-submenu-item">
            {/* Assurez-vous que l'ID est unique pour éviter les conflits */}
            <div className="checkbox-wrapper-1">
              <input id="example-3" className="substituted" type="checkbox" aria-hidden="true" />
              <label htmlFor="example-3">Soussous cat</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  {/* Ajoutez plus d'éléments de menu ici */}
 

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


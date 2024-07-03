import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useCategory } from '../BrandContext';
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
  const [Category, setCategory] = useState([]);
  const [CategoryFilter, setCategoryFilter] = useState([]);
  const { selectCategory } = useCategory();
  const { deselectCategory } = useCategory();

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/interface/category/subcategory/subsubcategory');
        const data = await response.json();
        setCategory(data); // Stockez les données des marques dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);


  const handleCheckboxChange = async (catIndex, category, event) => {
    const isChecked = event.target.checked;
    console.log(`La catégorie ${category} a été ${isChecked ? 'cochée' : 'décochée'}. Son index est : ${catIndex}`);
    try {
      if (isChecked) {
        // Ici, la logique spécifique lorsque la case est cochée
        console.log('Ajout de la catégorie:', category);
        selectCategory(category);

      } else {
        // Ici, la logique spécifique lorsque la case est décochée
        console.log('Suppression de la catégorie:', category);
        deselectCategory(category);
    
      }
    } catch {
      console.error(`Le filtre brand n'a pas fonctionné`);
    }
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
      <div style={{ marginBottom: '20px' }}>
      <h4 style={{ margin: '0', color:'##1b1b1b'}}>Catégories de cadeaux</h4>
      </div>
    </div>
    {/* Additional content here */}
  </div>
  <div className="menu">
    
  {Category.map((category, catIndex) => (
    <div key={`category-${catIndex}`} className="Navbar-menu-item">
      <div className="Navbar-menu-item">
        <input type="checkbox" id={`category-toggle-${catIndex}`} className="toggle substituted" />

        {/* Actionnement du filtre */}
        <label 
        htmlFor={`category-toggle-${catIndex}`} 
        className="label" 
        aria-hidden="true" 
        onChange={(event) => handleCheckboxChange(catIndex, category.category, event)}
        >

          <div className="arrow-container"><span className="arrow"></span></div>
          <div className="checkbox-wrapper-1">
            <input id={`cat-checkbox-${catIndex}`} className="substituted" type="checkbox" aria-hidden="true" />
            <label htmlFor={`cat-checkbox-${catIndex}`}>{category.category}</label>
          </div>
        </label>
        <div className="submenu">
          {category.subcategory.map((subcategory, subIndex) => (
            <div key={`subcategory-${catIndex}-${subIndex}`} className="Navbar-submenu-item">
              <input type="checkbox" id={`subcat-toggle-${catIndex}-${subIndex}`} className="toggle substituted" aria-hidden="true" />
              <label htmlFor={`subcat-toggle-${catIndex}-${subIndex}`} className="label">
                <div className="submenu-item">
                  <div className="arrow-container"><span className="arrow"></span></div>
                  <div className="checkbox-wrapper-1">
                    <input id={`subcat-checkbox-${catIndex}-${subIndex}`} className="substituted" type="checkbox" aria-hidden="true" />
                    <label htmlFor={`subcat-checkbox-${catIndex}-${subIndex}`}>{subcategory}</label>
                  </div>
                </div>
              </label>
              <div className="submenu">
                {category.subsubcategory.map((subsubcategory, subsubIndex) => (
                  <div key={`subsubcategory-${catIndex}-${subIndex}-${subsubIndex}`} className="Navbar-subsubmenu-item">
                    <input type="checkbox" id={`subsubcat-toggle-${catIndex}-${subIndex}-${subsubIndex}`} className="toggle substituted" aria-hidden="true" />
                    <label htmlFor={`subsubcat-toggle-${catIndex}-${subIndex}-${subsubIndex}`} className="label">
                      <div className="sub-submenu-item">
                        <div className="checkbox-wrapper-1">
                          <input id={`subsubcat-checkbox-${catIndex}-${subIndex}-${subsubIndex}`} className="substituted" type="checkbox" aria-hidden="true" />
                          <label htmlFor={`subsubcat-checkbox-${catIndex}-${subIndex}-${subsubIndex}`}>{subsubcategory}</label>
                        </div>
                      </div>
                      </label>
                    </div> 
                     ))}
                  </div> 
                </div>
                ))}
             </div>
          </div>
        </div>
        ))}
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


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBrand, useSeller } from '../BrandContext';
import './MenuBar.css';
import PriceRangeSlider from '../PriceRange/PriceRangeSlider';

function MenuBar(props) {

  const [Brand, setBrand] = useState([]);
  const [Seller, setSeller] = useState([]);

  const { selectBrand } = useBrand(); // Utilisez selectBrand pour mettre à jour la marque sélectionnée
  const {selectedSeller} = useSeller();
  const { selectSeller } = useSeller();

  const BrandFilter = async (brand) => {
    try {
       console.log(`voila le resultat de la marque ${brand}`);
       selectBrand(brand);
     }
     catch{
       console.error(`Le filtre brand n'a pas fonctionné`);
     }
   }

   const SellerFilter = async (seller) => {
    try {
      console.log(`voila le resultat du vendeur ${seller} sur menubar`);
      selectSeller(seller); // Corrigé pour utiliser la fonction de mise à jour
    }
    catch (error) {
      console.error(`Le filtre seller n'a pas fonctionné sur menubar`, error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/marques');
        const data = await response.json();
        setBrand(data); // Stockez les données des marques dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/vendeur');
        const data = await response.json();
        setSeller(data); // Stockez les données des marques dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);
  

    return (
      <div className="accordion" style={{ width: props.width, zIndex: 2 }}>
        <div className="accordion-item">
        <nav>
          <div className="wrapper">
            <input type="radio" name="slider" id="menu-btn" className='input'/>
            <input type="radio" name="slider" id="close-btn" className='input'/>
            <ul className="nav-links">
              <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
              {
      // menu defilant pour le prix
    }
              <li>
              <a href="#" className="desktop-item">Prix</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu-price">
                  <PriceRangeSlider/>
                  
                </ul>
              </li>
              {
      // Menu defilant pour les marques
    }
              <li>
                <a href="#" className="desktop-item">Marque</a>
                <input type="checkbox" id="showDrop" className='input' />
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                {
                    // Onclick n'affiche que les produit de la dites marques
                    }
              {Brand.map((brandObj, index) => (
              <li key={index}> {/* Clé ajoutée ici pour assurer l'unicité de chaque élément de la liste */}
              <a href="#" onClick={(e) => {
                                           e.preventDefault(); // Empêche la navigation
                                            BrandFilter(brandObj.brand); // Exécute la fonction avec la marque comme argument
                                            }}>
                                           {brandObj.brand}
              </a>
                 </li>
                  ))}
                </ul>
              </li>
              {
      // Menu defilant pour les vendeurs
    }
              <li>
              <a href="#" className="desktop-item">Vendeur</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                {
                    // Map pour defiler les vendeurs
                    }

                  {Seller.map((sellerObj, index) => (
                    <li key={index}>
                    <a href="#"onClick={(e) => {
                                           e.preventDefault(); // Empêche la navigation
                                           SellerFilter(sellerObj.name);
                                            }}>
                                           {sellerObj.name}
                                           </a>
                  </li>
                  ))}
                </ul>
              </li>
              <li>
              <a href="#" className="desktop-item">Nouveautés</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
              
              </li>
            </ul>
            <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
          </div>
        </nav>
      </div>
      </div>
    );
  }
  
  MenuBar.defaultProps = {
    width: '1800px'
  };
  
  

export default MenuBar;
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

export default function Homepage(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        const data = await response.json();
        setProducts(data); // Stockez les données de produit dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`${user.uid} et ${user.email}`);
      } else {
        console.error('Utilisateur non connecté.');
      }
    });
  
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const goToCategoryDetails = () => {
    navigate('/product details');
    console.log('test');
  };

  return (
    <div className="App" style={{ flexDirection: 'column' }}>
      <Navbar />
      <div className="NumberofProd" style={{marginTop: '18vh', color: "#B7B7B7", letterSpacing: "3px", fontWeight:"60", fontSize:"11px", textAlign:"center" }}>
        <h3>{props.NumberOfProduct}</h3>
      </div>
      <div className="MenuStyle">
      {
      // La prop 'name' sera utilisée pour afficher le nom de chaque catégorie
    }
    {products.map((product, index) => (
    <div key={index} className="MenuStyle">
      {/* Affiche la catégorie du produit */}
      <CategoryBox category={product.category} />  
      {/* Affiche le produit */}
      <ProductBox
        key={index}
        display={true}
        onclick={() => goToCategoryDetails()}
        productName={product.array_agg}
      />
    </div>
  ))}

      </div>
      <div className="QuizButtonContainer" style={{ position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)"}}>
        <QuizButton />
      </div>
    </div>
  );
}

Homepage.defaultProps = {
  NumberOfProduct: "0 résultat trouvé"
};





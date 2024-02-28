import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import ProductBox from './ProductBox/ProductBox';
import { useBrand, useSeller } from './BrandContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

export default function Homepage(props) {
  const [products, setProducts] = useState([]);
  const [NumberOfProd, setNumberOfProd] = useState('aucun résultat trouvé')

  const { selectedBrand } = useBrand();
  const {selectedSeller} = useSeller();

  // lancer le filtre avec le context de la menubar
  // lancer le filtre avec le context de la menubar
useEffect(() => {
  const fetchData = async () => {
    let queryParams = [];
    if (selectedBrand) {
      queryParams.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      setNumberOfProd(`resultat pour la marque ${selectedBrand}`)
    }
    if (selectedSeller) {
      queryParams.push(`seller_name=${encodeURIComponent(selectedSeller)}`);
      setNumberOfProd(`resultat pour le vendeur ${selectedSeller}`)
    }

    let url = 'http://localhost:3001/api/products'; // URL par défaut
    if (queryParams.length > 0) {
      const baseApiUrl = selectedSeller && selectedBrand ? '/api/Filtre/vendeur/marque' : selectedSeller ? '/api/Filtrevendeur' : '/api/Filtremarque';
      url = `http://localhost:3001${baseApiUrl}?${queryParams.join('&')}`;
      setNumberOfProd(`resultat pour la marque ${selectedBrand} et le vendeur ${selectedSeller}`)
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Réponse réseau non OK');
      }
      const data = await response.json();
      setProducts(data); // Met à jour l'état avec les produits filtrés ou tous les produits
      console.log("voici le resultat du filtre:",data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  fetchData();
}, [selectedBrand, selectedSeller]); // Exécutez l'effet chaque fois que `selectedBrand` change

  
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
  const goToCategoryDetails = (array_agg) => {
    navigate('/product details', { state: { message: array_agg } });
    console.log('test');
  };

  return (
    <div className="App" style={{ flexDirection: 'column' }}>
      <Navbar />
      <div className="NumberofProd" style={{marginTop: '18vh', color: "#B7B7B7", letterSpacing: "3px", fontWeight:"60", fontSize:"11px", textAlign:"center" }}>
        <h3>{NumberOfProd}</h3>
      </div>
      <div className="MenuStyle">
      {
      // La prop 'name' sera utilisée pour afficher le nom de chaque catégorie
    }
  {products.map((category, index) => (
  <div key={index} className="MenuStyle">
    {/* Affiche la catégorie du produit */}
    <CategoryBox category={category.category} />
    {/* Itère sur chaque produit de la catégorie */}
    {category.array_agg.map((productName, productIndex) => (
      <ProductBox
        key={productIndex} // Utilisez productIndex ici pour une clé unique
        display={true}
        productName={productName}
        onclick={() => goToCategoryDetails(productName)}
      />
    ))}
  </div>
))}
      </div>
      <div className="QuizButtonContainer" style={{ position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)"}}>
        <QuizButton />
      </div>

    </div>
  );
}


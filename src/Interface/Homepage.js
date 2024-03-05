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
  const goToCategoryDetails = (productSeller) => {
    navigate('/product details', { state: { message: productSeller } });
    console.log('test');
  };

  const goToProductLink = (link) => {
    // Si le lien est interne à l'application, utilisez navigate
      window.location.href = link; // Pour naviguer directement
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
{
  products.map((category, index) => (
    <div key={index} className="MenuStyle">
      <CategoryBox category={category.category} />
      {category.name.map((productName, productIndex) => {
        const productSeller = category.seller[productIndex];
        const productLink = category.link[productIndex];
        return (
          <ProductBox
            key={`${index}-${productIndex}`} // Clé unique améliorée
            display={true}
            productName={productName}
            onclick={() => goToCategoryDetails(productSeller)} // Supposition de la fonction goToCategoryDetails
            Link={productLink} // Correction pour passer le lien correctement
            ClickLink={() => goToProductLink(productLink)} // Supposition de la fonction goToProductLink
          />
        );
      })}
    </div>
  ))
}

      
      </div>
      <div className="QuizButtonContainer" style={{ position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)"}}>
        <QuizButton />
      </div>

    </div>
  );
}


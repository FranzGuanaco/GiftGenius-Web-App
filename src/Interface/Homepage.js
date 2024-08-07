import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import ProductBox from './ProductBox/ProductBox';
import { useBrand, useSeller, useCategory } from './BrandContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

// if selected nom du filtre coloré verfier plusieurs filtres
export default function Homepage(props) {
  const [products, setProducts] = useState([]);
  const [NumberOfProd, setNumberOfProd] = useState('aucun résultat trouvé')
  const { selectedBrand } = useBrand();
  const {selectedSeller} = useSeller();
  const {selectedCategory} = useCategory();
  const { deselectCategory } = useCategory();
  const [marque, setMarque] = useState();
  const [vendeur, setVendeur] = useState();
  const [categorie, setCategorie] = useState();


  // lancer le filtre avec le context de la menubar
useEffect(() => {
  const fetchData = async () => {
    let queryParams = [];
    if (selectedBrand.length > 0) {
      const brandJoined = selectedBrand.join(',');
      queryParams.push(`brand_name=${encodeURIComponent(brandJoined)}`);
      setMarque(selectedBrand)
      console.log('Brand currently selected:', selectedBrand)
    }
    if (selectedSeller.length > 0) {
      const sellersJoined = selectedSeller.join(',');
      queryParams.push(`seller_name=${encodeURIComponent(sellersJoined)}`);
      setVendeur(selectedSeller);
      console.log('Seller currently selected:', selectedSeller)
    }
    if (selectedCategory.length > 0){
      const categoryJoined = selectedCategory.join(',');
      queryParams.push(`category_name=${encodeURIComponent(categoryJoined)}`);
      setCategorie(selectedCategory)
      console.log('Categories currently selected:', selectedCategory)
      
    }
    let url = 'http://localhost:3001/api/interface/products'; // URL par défaut
    if (queryParams.length > 0) {
      const baseApiUrl =  selectedSeller.length > 0 && selectedBrand.length > 0 && selectedCategory.length > 0 ? '/api/interface/Filtre/vendeur/marque/categorie' : 
                          selectedSeller.length > 0 && selectedBrand.length > 0 ? '/api/interface/Filtre/vendeur/marque': 
                          selectedCategory.length > 0 && selectedBrand.length > 0 ? '/api/interface/Filtre/category/marque':
                          selectedCategory.length > 0 && selectedSeller.length > 0 ? '/api/interface/Filtre/category/vendeur':
                          selectedSeller.length > 0 ? '/api/interface/Filtrevendeur' : 
                          selectedBrand.length > 0 ? '/api/Filtremarque': '/api/interface/categoriesfilter'
      url = `http://localhost:3001${baseApiUrl}?${queryParams.join('&')}`;     
    }

    console.log("URL utilisée pour la requête:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Réponse réseau non OK');
      }
      const data = await response.json();
      setProducts(data); // Met à jour l'état avec les produits filtrés ou tous les produits
      setNumberOfProd(data)
      console.log("voici le resultat du filtre:",data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  fetchData();
}, [selectedBrand, selectedSeller, selectedCategory]); // Exécutez l'effet chaque fois que `selectedBrand` change



  // message en console pour savoir si le user est connecté
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
  
  // const pour reduire la taille des nom de produit et description trop longue
  const formatProductName = (productInfo ) => {
  if (productInfo.length > 30) {
    return `${productInfo.substring(0, 30)} . . .`;
  }
  return productInfo;
};


  return (
    <div className="App" style={{ flexDirection: 'column' }}>
      <Navbar />
      <div className="NumberofProd NumberofProdStyle">
      {
  // Vérification qu'il s'agit bien d'un tableau et qu'il n'est pas vide
  Array.isArray(NumberOfProd) && NumberOfProd.length > 0 && (
    <h3>Le nombre total d'article est {NumberOfProd[0].total_product_count}</h3>
  )
}
      </div>
      <h3>marque {marque}</h3>
      <h3>vendeur {vendeur}</h3>
      <h3>categorie {categorie}</h3>
      <div className="MenuStyle">
      {
      // La prop 'name' sera utilisée pour afficher le nom de chaque catégorie
}

{
  products.map((category, index) => (
    <div key={index} className="MenuStyle">
      <CategoryBox category={category.category} />
      <div className="productGrid">
     
      {category.name.map((productName, productIndex) => {
        const formattedProductName = formatProductName(productName);
        const productSeller = category.seller[productIndex];
        const productLink = category.link[productIndex];
        const productDescription = category.desc[productIndex];
        const formattedproductDescription = formatProductName(productDescription);
        return (
          <div class="grid-item">
          <ProductBox
            key={`${index}-${productIndex}`} // Clé unique améliorée
            display={true}
            productName={formattedProductName}
            shortDescription={formattedproductDescription}
            onclick={() => goToCategoryDetails(productSeller)} // Supposition de la fonction goToCategoryDetails
            Link={productLink} // Correction pour passer le lien correctement
            ClickLink={() => goToProductLink(productLink)} // Supposition de la fonction goToProductLink
          />
           </div>
        );
      })}
    </div>
    </div>
  ))} 
  </div>
      <div className="QuizButtonContainer" id="Quiz">
        <QuizButton />
      </div>
    </div>
  );
}


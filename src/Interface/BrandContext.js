import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();
const SellerContext = createContext();
const CategoryContext = createContext();

export const useBrand = () => useContext(BrandContext);
export const useSeller = () => useContext(SellerContext);
export const useCategory = () => useContext(CategoryContext);

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState([]);
  // Maintient seulement une liste pour les catégories sélectionnées
  const [selectedCategory, setSelectedCategory] = useState([]);

  const selectBrand = (brand) => {
    setSelectedBrand(prevBrand => {
        if (!prevBrand.includes(brand)){
          return [...prevBrand, brand]
        }
    });
  };

  const deselectBrand = (brand) => {
    setSelectedSeller(prevBrand => prevBrand.filter(s => s !== brand));
  };

  const selectSeller = (seller) => {
    setSelectedSeller(prevSellers => {
      // Vérifie si le vendeur est déjà dans le tableau pour éviter les doublons
      if (!prevSellers.includes(seller)) {
        return [...prevSellers, seller]; // Ajoute le vendeur au tableau existant
      }
      return prevSellers; // Retourne le tableau inchangé si le vendeur est déjà présent
    });
  };

  const deselectSeller = (seller) => {
    setSelectedSeller(prevSellers => prevSellers.filter(s => s !== seller));
  };
  

  // Ajoute une catégorie à la liste si elle n'est pas déjà présente
  const selectCategory = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory(prev => [...prev, category]);
    }
  };

  // Retire une catégorie de la liste lorsqu'elle est désélectionnée
  const deselectCategory = (category) => {
    setSelectedCategory(prev => prev.filter(cat => cat !== category));
  };

  return (
    <BrandContext.Provider value={{ selectedBrand, selectBrand, deselectBrand }}>
      <SellerContext.Provider value={{ selectedSeller, selectSeller, deselectSeller }}>
        <CategoryContext.Provider value={{ selectedCategory, selectCategory, deselectCategory }}>
          {children}
        </CategoryContext.Provider>
      </SellerContext.Provider>
    </BrandContext.Provider>
  );
};

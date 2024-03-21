import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();
const SellerContext = createContext();
const CategoryContext = createContext();

export const useBrand = () => useContext(BrandContext);
export const useSeller = () => useContext(SellerContext);
export const useCategory = () => useContext(CategoryContext);

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  // Maintient seulement une liste pour les catégories sélectionnées
  const [selectedCategory, setSelectedCategory] = useState([]);

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const selectSeller = (seller) => {
    setSelectedSeller(seller);
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
    <BrandContext.Provider value={{ selectedBrand, selectBrand }}>
      <SellerContext.Provider value={{ selectedSeller, selectSeller }}>
        <CategoryContext.Provider value={{ selectedCategory, selectCategory, deselectCategory }}>
          {children}
        </CategoryContext.Provider>
      </SellerContext.Provider>
    </BrandContext.Provider>
  );
};

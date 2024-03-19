import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();
const SellerContext = createContext(); // Ajout de la déclaration du SellerContext
const CategoryContext = createContext();

export const useBrand = () => useContext(BrandContext);
export const useSeller = () => useContext(SellerContext); // Exportation de useSeller
export const useCategory = () => useContext(CategoryContext);

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const selectSeller = (seller) => { // Changement de nom de la fonction pour éviter la redéclaration
    setSelectedSeller(seller)
  }

  const selectCategory = (category) => { // Changement de nom de la fonction pour éviter la redéclaration
    setSelectedCategory(category)
  }

  return (
    <BrandContext.Provider value={{ selectedBrand, selectBrand }}>
    <SellerContext.Provider value={{ selectedSeller, selectSeller }}>
      <CategoryContext.Provider value={{ selectedCategory, selectCategory }}>
        {children}
      </CategoryContext.Provider>
    </SellerContext.Provider>
  </BrandContext.Provider>
);
};
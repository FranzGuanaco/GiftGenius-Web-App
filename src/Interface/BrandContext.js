import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();
const SellerContext = createContext(); // Ajout de la déclaration du SellerContext

export const useBrand = () => useContext(BrandContext);
export const useSeller = () => useContext(SellerContext); // Exportation de useSeller

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const selectSeller = (seller) => { // Changement de nom de la fonction pour éviter la redéclaration
    setSelectedSeller(seller)
  }

  return (
    <BrandContext.Provider value={{ selectedBrand, selectBrand }}>
      <SellerContext.Provider value={{ selectedSeller, selectSeller }}> {/* Utilisation du SellerContext.Provider */}
        {children}
      </SellerContext.Provider>
    </BrandContext.Provider>
  );
};

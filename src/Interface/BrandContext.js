import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export const useBrand = () => useContext(BrandContext);

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const selectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <BrandContext.Provider value={{ selectedBrand, selectBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

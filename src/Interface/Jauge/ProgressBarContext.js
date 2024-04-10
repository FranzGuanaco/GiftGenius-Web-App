import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const ProgressBarContext = createContext();

// Provider
export const ProgressBarProvider = ({ children }) => {
  const [progression, setProgression] = useState(0);

  const handleClick = () => {
    const newProgression = Math.min(progression + 10, 100);
    setProgression(newProgression);
    // La logique de mise à jour du progressBar sera déplacée ici si nécessaire
  };

  return (
    <ProgressBarContext.Provider value={{ progression, handleClick }}>
      {children}
    </ProgressBarContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useProgressBar = () => useContext(ProgressBarContext);

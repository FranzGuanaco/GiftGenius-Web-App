import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const ProgressBarContext = createContext();

// Provider
export const ProgressBarProvider = ({ children }) => {
  const [progression, setProgression] = useState(0);

  const incrementProgressBar = () => {
    const newProgression = Math.min(progression + 10, 100);
    setProgression(newProgression);
    // La logique de mise à jour du progressBar sera déplacée ici si nécessaire
  };

  const decrementProgressBar = () => {
    const newProgression = Math.min(progression - 10, 0);
    setProgression(newProgression);
    // La logique de mise à jour du progressBar sera déplacée ici si nécessaire
  };

  return (
    <ProgressBarContext.Provider value={{ progression, incrementProgressBar, decrementProgressBar }}>
      {children}
    </ProgressBarContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useProgressBar = () => useContext(ProgressBarContext);

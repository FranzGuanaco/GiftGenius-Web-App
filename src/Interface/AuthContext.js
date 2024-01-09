import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [randomNum, setRandomNum] = useState(null);
  const [codeGenerationTimestampMilliSecond, setcodeGenerationTimestampMilliSecond] = useState('');

  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, nickname, setNickname, randomNum, setRandomNum, codeGenerationTimestampMilliSecond, setcodeGenerationTimestampMilliSecond }}>
      {children}
    </AuthContext.Provider>
  );
};

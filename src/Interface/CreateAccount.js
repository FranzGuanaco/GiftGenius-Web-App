
import React, { createContext, useState, useContext } from 'react';
import Input from './Input/Input';
import SellerButton from './SellerButton/SellerButton';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const generateRandomNumber = () => Math.floor(100000 + Math.random() * 900000);
  

function CreateAccount() {

  const {email, setEmail, password, setPassword, nickname, setNickname , randomNum, setRandomNum, codeGenerationTimestampMilliSecond, setcodeGenerationTimestampMilliSecond} = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();


  const goToConfirmation = () => {
    navigate('/confirmation');
    console.log('test');
  }

  const sendEmail = async () => {
  if (randomNum === null) {
    const newRandomNum = generateRandomNumber();
    setRandomNum(newRandomNum);
    const currentTimestamp = Date.now();
    setcodeGenerationTimestampMilliSecond(currentTimestamp); // Mettre à jour l'état avec la variable
    console.log(`Timestamp: ${currentTimestamp}`); 

    const emailParams = {
      from_name: "Gift Genius",
      user_email: email,
      unique_code: newRandomNum
    };

    try {
      const result = await emailjs.send('gift_genius2024', 'GiftGeniusConfirmation', emailParams, 'WNkAG24NwAI_iP2iL');
      console.log(result.text);
      console.log(`envoie de ${email} et ${password} et ${nickname} et random ${randomNum} à confirmation`)
      // goToConfirmation(); // Naviguer vers la page de confirmation après l'envoi de l'email
    } catch (error) {
      console.error(error.text);
      throw error; // Propagez l'erreur pour la gérer dans la fonction appelante
    }
  }
};

  
  const handleCreateAccount = () => {
    sendEmail()
      .then(() => {
        // Cette partie s'exécutera après la réussite de sendEmail
        goToConfirmation();
      })
      .catch((error) => {
        // Cette partie attrapera les erreurs soit de createUserWithEmailAndPassword, soit de sendEmail
        console.error('Error:', error);
      });
  };

  return (
    <div className='background' style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '400px',
        margin: 'auto',
        height: "500px",
        width: "40vh",
        paddingTop: "100px",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ marginBottom: '20px' }}>
          <Input
            type="text"
            placeholder="Nickname"
            handleChange={(event) => setNickname(event.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div style={{ marginLeft: "35%", marginTop: "5%" }}>
          <SellerButton width={"120px"} height={"50px"} onClick={handleCreateAccount} />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;


import React, { createContext, useState, useContext } from 'react';
import Input from './Input/Input';
import SellerButton from './SellerButton/SellerButton';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const generateRandomNumber =  Math.floor(100000 + Math.random() * 900000);
  

function CreateAccount() {
    const {email, setEmail, password, setPassword } = useAuth();
  const [nickname, setNickname] = useState(''); // Ajouté pour gérer le surnom
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();


  const goToConfirmation = () => {
    navigate('/confirmation');
    console.log('test');
  }


  const sendEmail = () => {

    const randomNum = generateRandomNumber

    const emailParams = {
        from_name: "Gift Genius", // Nom d'utilisateur ou autre champ
        user_email: email, // Adresse email
        unique_code: randomNum // Message ou contenu de l'email
      };
    return emailjs.send('gift_genius2024', 'GiftGeniusConfirmation', emailParams , 'WNkAG24NwAI_iP2iL' )
      .then((result) => {
        console.log(result.text);
       // goToConfirmation(); // Naviguer vers la page de confirmation après l'envoi de l'email
      }, (error) => {
        console.log(error.text);
      });
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

  const handleInputChange = (e, index) => {
    let value = e.target.value;
    if (/[^0-9]/.test(value)) {
      return;
    }
    code[index] = value;
    if (index < code.length - 1 && value !== '') {
      document.getElementById(`input${index + 1}`).focus();
    }
    setCode([...code]);
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

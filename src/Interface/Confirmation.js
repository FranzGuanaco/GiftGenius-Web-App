import React from 'react';
import { useState } from 'react';
import SellerButton from './SellerButton/SellerButton';
import { generateRandomNumber } from './CreateAccount';

function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    console.log(code)
  };

  const handleSubmit = () => {
    const Code = code.join('');
    const verificationCode = Code.toString()
    const randomNumber = generateRandomNumber.toString();// Générer un nombre pour la comparaison

  if (verificationCode === randomNumber) {
    console.log('Code correct');
  } else {
    console.log('Type de code:', typeof code);
    console.log('Type de generateRandomNumber:', typeof generateRandomNumber);
    console.log('Code de vérification:', verificationCode);
    console.log('Nombre aléatoire attendu:', randomNumber);
  }
    // You can add the code to verify the email here
  };

  return (
    <div className='background' style={{backgroundColor:"#f0f0f0", height:"100vh"}}>
    <div style={{
      textAlign: 'center', 
      maxWidth: '400px', 
      margin: 'auto', 
      background: "red",  
      height: "500px",
      width: "40vh", 
      paddingTop: "100px",
      paddingLeft: "30px",
      paddingRight: "30px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Verify your email address</h2>
        <p>We send you a six-digit code to pierrechev@gmail.com</p>
        <p>Enter the code below to confirm your email address</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {code.map((data, index) => (
          <input
            id={`input${index}`}
            type="text"
            value={data}
            onChange={(e) => handleInputChange(e, index)}
            key={index}
         
            maxLength="1"
            style={{
              width: '40px',
              height: '40px',
              fontSize: '20px',
              margin: '0 5px',
              borderRadius: "10px"
            }}
          />
        ))}
      </div>
      
      <div style={{ marginLeft:"35%", marginTop:"15%"}}>
        <SellerButton width={"120px"} height={"50px"} onClick={handleSubmit}/>
      </div>
      </div>
      </div>
  );
}

export default EmailVerification;



import React from 'react';
import { useState } from 'react';
import SellerButton from './SellerButton/SellerButton';

function EmailVerification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);

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

  const handleSubmit = () => {
    const verificationCode = code.join('');
    console.log("Submitted code:", verificationCode);
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
            key={index}
            onChange={(e) => handleInputChange(e, index)}
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
        <SellerButton width={"120px"} height={"50px"}/>
      </div>
      </div>
      </div>
  );
}

export default EmailVerification;



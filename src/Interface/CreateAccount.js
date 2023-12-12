import React from 'react';
import { useState } from 'react';
import SellerButton from './SellerButton/SellerButton';
import Input from './Input/Input';

function CreateAccount() {
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
      <Input
            type="Nickname"
            placeholder="Nickname"/>
        <Input
            type="Mail"
            placeholder="Mail"/>
        <Input
            type="password"
            placeholder="Password"/>
     
      </div>
      
      <div style={{ marginLeft:"35%", marginTop:"5%"}}>
        <SellerButton width={"120px"} height={"50px"}/>
      </div>
      </div>
      </div>
  );
}

export default CreateAccount;
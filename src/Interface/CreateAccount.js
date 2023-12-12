import React, { useState } from 'react';
import SellerButton from './SellerButton/SellerButton';
import Input from './Input/Input';
import { auth, createUser } from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

function CreateAccount() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const goToConfirmation = () => {
    navigate('/confirmation')
    console.log('test')
};

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('User created:', user);
        // Vous pouvez ici rediriger l'utilisateur ou faire d'autres opérations post-inscription
        goToConfirmation()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error creating user:', errorCode, errorMessage);
        // Ici, vous pouvez gérer les erreurs, par exemple en affichant un message à l'utilisateur
      });
  };

  // State to store input values for verification code
  const [code, setCode] = useState(['', '', '', '', '', '']);

  // Function to handle input change
  const handleInputChange = (e, index) => {
    let value = e.target.value;

    // Prevent non-numeric characters
    if (/[^0-9]/.test(value)) {
      return;
    }

    // Update code array with new value
    code[index] = value;

    // Automatically move to next input field after a valid input
    if (index < code.length - 1 && value !== '') {
      document.getElementById(`input${index + 1}`).focus();
    }

    // Update state with new code array
    setCode([...code]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Join code array to get the full verification code
    const verificationCode = code.join('');
    console.log("Submitted code:", verificationCode);
    // TODO: Add the code here to handle the verification of the code
    // This is where you would typically call a backend service to verify the code
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
          {/* Inputs to collect user nickname, email, and password */}
          <Input
              type="text"
              placeholder="Nickname"/>
          <Input
              type="email"
              placeholder="Email"
              handleChange={(event) => setEmail(event.target.value)}/>
          <Input
              type="password"
              placeholder="Password"
              handleChange={(event) => setPassword(event.target.value)}/>
        </div>
        
        {/* Button for user to submit their details */}
        <div style={{ marginLeft:"35%", marginTop:"5%"}}>
          <SellerButton width={"120px"} height={"50px"} onClick={handleCreateAccount}/>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;

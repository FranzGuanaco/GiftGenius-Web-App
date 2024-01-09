import React from 'react';
import { useState } from 'react';
import SellerButton from './SellerButton/SellerButton';
import { generateRandomNumber } from './CreateAccount';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { auth } from '../Firebase'; // Assurez-vous que cette importation est correcte
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {

  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/')
    console.log('home')
};


  const { email, password, nickname, randomNum, codeGenerationTimestampMilliSecond } = useAuth();
  console.log(`${email} et ${password} et ${nickname} et random ${randomNum} et time ${codeGenerationTimestampMilliSecond}`);
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    console.log(code)
  };

  const UserDB = (userUID) => {
    // Accédez à la collection "cities" et ajoutez un document
    const userCollection = collection(db, "Users");
    const laDoc = doc(userCollection, userUID);

    setDoc(laDoc, {
      name: nickname,
      email: email,
      favorite: {}
    })
      .then(() => {
        console.log("Document écrit avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'écriture du document : ", error);
      });
  }

  const handleSubmit = () => {

    const currentTimestampMilliSecond = Date.now();
    const currentTimestamp = currentTimestampMilliSecond / 1000
    const codeGenerationTimestamp = codeGenerationTimestampMilliSecond / 1000
    const Code = code.join('');
    const verificationCode = Code.toString()
    const randomNumber = randomNum.toString();// Générer un nombre pour la comparaison

    if (verificationCode === randomNumber && currentTimestamp - codeGenerationTimestamp < 300) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User created:', user);
          return UserDB(user.uid); // Utilisez return ici pour retourner la promesse de test
        })
        .then(() => {
          goToHomepage();
        })
        .catch((error) => {
          // Cette partie attrapera les erreurs soit de createUserWithEmailAndPassword, soit de sendEmail
          console.error('Error:', error);
          
        });
  } else {
    console.log('Type de code:', typeof code);
    console.log('Type de generateRandomNumber:', typeof randomNumber);
    console.log('Code de vérification:', verificationCode);
    console.log('Nombre aléatoire attendu:', randomNumber);
    console.error(currentTimestamp - codeGenerationTimestamp);
    alert('le délai de reception de votre mot de passe s\'est écoulé')
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
        <p>We send you a six-digit code to {email}</p>
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



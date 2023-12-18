import React, { useState } from 'react';
import Input from './Input/Input';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const test = () => {
        // Accédez à la collection "cities" et ajoutez un document
        const citiesCollection = collection(db, "cities");
        const laDoc = doc(citiesCollection, "LA");
    
        setDoc(laDoc, {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        })
          .then(() => {
            console.log("Document écrit avec succès !");
          })
          .catch((error) => {
            console.error("Erreur lors de l'écriture du document : ", error);
          });
      }

    const Connection = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User connected:', user);
            test()

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const goToCreateAccount = () => {
    navigate('/create account')
    console.log('test')
};
    
    return (
        <div style={{
            display: 'flex', width: '100%', height:"100%", 
        }}>
            <div style={{
                padding: '50px', 
                textAlign: 'center', 
                width: '50%', 
                height: "90vh"
            }}>
                <div style={{paddingTop: "20%"}}>
                <h2 className='h2-login-pattern'>Sign in</h2>
                <Input
                    type="text"
                    placeholder="Email or phone number"
                    handleChange={(event) => setEmail(event.target.value)}
               
                />
                <Input
                    type="password"
                    placeholder="Password"
                    handleChange={(event) => setPassword(event.target.value)}
                   
                />
               <div style={{height:"30px"}}></div>
               <button className="login-button" onClick={Connection}>Connexion</button>
                <div style={{height:"50px"}}></div>
                <p>Or sign in with...</p>
                <div style={{height:"20px"}}></div>
                <button className="login-button"></button>
                
            </div>
            </div>
            
            <div className='login-pattern'>
                <div style={{paddingTop: "20%", color:'aliceblue'}}>
                <h2 className='h2-login-pattern'>Nouveau chez Gift Genius ?</h2>
                <p className='p-login'>Rejoignez nous en quelques clics</p>
                <button className="login-button" onClick={goToCreateAccount}>Inscription</button>
            </div>
        </div>
        </div>
        
    );
}

export default Login;

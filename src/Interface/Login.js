import React, { useState } from 'react';
import Input from './Input/Input';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase';
import google_icon from './google_icon.png'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    const GmailConnection = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Ceci vous donne un jeton d'accès Google. Vous pouvez l'utiliser pour accéder à l'API Google.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // Les informations de l'utilisateur connecté
                const user = result.user;
                // ...
                navigation('Home'); // Redirigez l'utilisateur où vous voulez après la connexion
            }).catch((error) => {
                // Gérez les erreurs ici.
                const errorCode = error.code;
                const errorMessage = error.message;
                // Le courriel de l'utilisateur qui a été utilisé pour la tentative de connexion
                const email = error.email;
                // Le type AuthCredential qui a été utilisé
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };


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
        navigation('/create account'); // Utilisez la navigation React Native
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
               <button className="login-button" onClick={Connection} style={{padding: '10px 20px'}}>Connexion</button>
                <div style={{height:"50px"}}></div>
                <p>Or sign in with...</p>
                <div style={{height:"20px"}}></div>
                <button className="login-button" onClick={GmailConnection}><img src={google_icon} alt="Sign in with Google"
                style={{ width: '30px', 
                padding: '10px 20px',
                height: '30px', 
                alignContent:'center' }}  /></button>
                
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

Login.defaultProps = {
    google_icon: google_icon,
   
  }

export default Login;

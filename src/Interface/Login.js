import React, { useState } from 'react';
import Input from './Input/Input';
import SellerButton from './SellerButton/SellerButton';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
               <button className="login-button"></button>
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
                <button className="login-button"/>
            </div>
        </div>
        </div>
        
    );
}

export default Login;

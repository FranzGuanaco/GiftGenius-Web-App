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
                backgroundColor: 'red', 
                padding: '50px', 
                textAlign: 'center', 
                width: '50%', 
                height: "90vh"
            }}>
                <div style={{paddingTop: "20%"}}>
                <h2>Sign in</h2>
                <Input
                    type="text"
                    placeholder="Email or phone number"
                    handleChange={(event) => setEmail(event.target.value)}
                    width={"50%"}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    handleChange={(event) => setPassword(event.target.value)}
                    width={"50%"}
                />
               <div style={{height:"30px"}}></div>
                <SellerButton width={"25%"} height={"40px"} autoMargin={true}/>
                <div style={{height:"50px"}}></div>
                <p>Or sign in with...</p>
                <div style={{height:"20px"}}></div>
                <SellerButton width={"25%"} height={"40px"} autoMargin={true}/>
            </div>
            </div>
            
            <div style={{
                backgroundColor: '#f0f0f0', padding: '50px', textAlign: 'center', width: '50%'
            }}>
                <div style={{paddingTop: "20%"}}>
                <h2>Nouveau chez Gift Genius ?</h2>
                <p>Rejoignez nous en quelques clics</p>
                <SellerButton width={"25%"} height={"40px"} autoMargin={true}/>
            </div>
        </div>
        </div>
        
    );
}

export default Login;

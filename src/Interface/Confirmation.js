import React from 'react';
import { useState } from 'react';

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
    
  
    <div style={{ textAlign: 'center', 
                maxWidth: '400px', 
                margin: 'auto', 
                background: "red", 
                marginTop:"200px", 
                height: "500px",
                width: "90%", 
                paddingTop: "100px",
                paddingLeft: "30px",
                paddingRight: "30px"}}>
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
      <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Submit
      </button>
    </div>

  );
}

export default EmailVerification;



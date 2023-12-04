import React from 'react';
import './SatisfactionBox.css';

const SatisfactionBox = () => {
    return (
        <div className="SatisfactionBox">
             <div className="message">Your message here</div>
             <div className="buttons">
            <div className='unsatisfaction-button'>Non</div>
            <div className='satisfaction-button'>Oui</div>     
            </div>
        </div>
    );
} 

export default SatisfactionBox;

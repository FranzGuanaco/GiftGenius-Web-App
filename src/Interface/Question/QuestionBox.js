import React from 'react';
import './QuestionBox.css';


const QuestionBox = ({ imageUrl, onClick, answer }) => {
  return (
    <div className="questionBox" onClick={onClick}>
      <div className="imageContainer">
        <img src={imageUrl} alt="Votre image" className="questionBox-image" />
        <h1 className="imageText">{answer}</h1>
      </div>
    </div>
  );
}

export default QuestionBox;


import React from 'react';
import './QuestionBox.css';

const QuestionBox = ({ imageUrl, onClick, answer }) => {
  return (
    <div className="questionBox"  onClick={onClick}>
      <img src={imageUrl} alt="Votre image" className="questionBox-image" />
      <h1>{answer}</h1>
    </div>
  );
}

export default QuestionBox;


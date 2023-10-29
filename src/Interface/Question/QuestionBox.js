import React from 'react';
import './QuestionBox.css';

const QuestionBox = ({ imageUrl, onClick }) => {
  return (
    <div className="questionBox"  onClick={onClick}>
      <img src={imageUrl} alt="Votre image" className="questionBox-image" />
    </div>
  );
}

export default QuestionBox;


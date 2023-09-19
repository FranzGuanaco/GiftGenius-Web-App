import React from 'react';
import './QuestionBox.css';

const QuestionBox = ({ imageUrl, onClick }) => {
  return (
    <div className="questionBox" style={{ marginLeft: '2%', width: '40%' }} onClick={onClick}>
      <img src={imageUrl} alt="Votre image" className="questionBox-image" />
    </div>
  );
}

export default QuestionBox;


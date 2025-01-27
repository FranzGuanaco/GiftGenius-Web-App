import React from 'react';
import './QuestionBoxProps.css';


const QuestionBoxProps = ({ onClick, proposition }) => {
  return (
    <div className="questionBoxProps" onClick={onClick}>
        <div className="imageContainerProps">
        <h1 className="imageTextProps">{proposition}</h1>
        </div>
    </div>
  );
}

export default QuestionBoxProps;

import React from 'react';
import questionnaire_icon from './questionnaire_icon.png'
import './QuizButton.css'; 

const QuizButton = () => {
  return (
          <div className="circle-slice">
            <div className="flat-angle">
              <img src={questionnaire_icon} alt="Center" style={{width:'134px', marginTop:'90%', marginLeft:"70%"}}/>
            </div>
          </div>
      );
    };

export default QuizButton;

import React from 'react';
import questionnaire_icon from './questionnaire_icon.png'
import './QuizButton.css'; 
import { useNavigate } from 'react-router-dom';

const QuizButton = () => {

  const navigate = useNavigate();

  

  const goToQuiz = () => {
    navigate('/quiz')
    console.log('test')
};

  return (
    
          <div className="circle-slice">
            <div className="flat-angle">
              <img src={questionnaire_icon} alt="Center" onClick={goToQuiz}/>
            </div>
          </div>
          
      );
    };

export default QuizButton;

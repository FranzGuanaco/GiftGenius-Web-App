import React, { useState } from 'react';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';

const Quiz = ({ question }) => {

  const [triggered, setTriggered] = useState(false); // État pour contrôler le déclenchement

  const handleQuestionBoxClick = () => {
      setTriggered(true); // Déclenche l'animation en mettant triggered à true
      console.log("clické")
    
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="ButtonBackStyle" style={{ position: "fixed", marginTop: '50%', marginLeft: '7%' }}>
        <ButtonBack />
      </div>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="NewsStyle">
        <NewsBox />
      </div>
      <div className="QuestionStyle" style={{ textAlign: 'center', marginTop: '3%' }}>
        <h3>{question}</h3>
      </div>
      <div style={{ left: '50%', marginTop: '2%', marginLeft: '22%', border: '2px solid red', padding: '10px', width: "60%", height: '80%' }}>
        <QuestionBox onClick={handleQuestionBoxClick} />
        <ProgressBar trigger={triggered} />
      </div>
      <div></div>
    </div>
  );
  }  

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;

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
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
    <Navbar width="100%" style={{ position: 'sticky', top: 0, zIndex: 100 }} />
  
    <div className="page-NewsBox" style={{ paddingTop: '70px' }}>
      <NewsBox width="100%" style={{ position: 'sticky' }} />
    </div>
  
    <div className="QuestionStyle" style={{ textAlign: 'center', marginTop: '5%' }}>
      <h3>{question}</h3>
    </div>
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ border: '2px solid red', padding: '10px', width: '80%', height: '80%', marginLeft: '25%' }}>
        <QuestionBox onClick={handleQuestionBoxClick} />
        
      </div>
     
      <div style={{ top: '100%' }}>
        <ProgressBar trigger={triggered} />
      </div>
    </div>
    <div style={{ position: 'fixed', left: "10%", top: '90%' }}>
    <ButtonBack />
  </div>
  </div>
  
  );
  }  

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;

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
    <div className="App" >

<Navbar width={"100%"} style={{ top: '0', zIndex: '2' }}></Navbar>
      
<div className="Container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <div className="QuestionStyle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: '10%' }}>
    <div style={{ position: 'absolute', left: '30%' }}> 
      <ButtonBack />
    </div>
    <div style={{ paddingLeft: '50px', textAlign: 'center' }}> 
      <h3>{question}</h3>
    </div>
  </div>


      <div className="QuizStyle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh'}}>
      
  <div className="QuizGrid" >
    <div className="QuizItem">
      <QuestionBox onClick={handleQuestionBoxClick}/>
    </div>
    <div className="QuizItem">
      <QuestionBox onClick={handleQuestionBoxClick}/>
    </div>
    <div className="QuizItem">
      <QuestionBox onClick={handleQuestionBoxClick}/>
    </div>
    <div className="QuizItem">
      <QuestionBox onClick={handleQuestionBoxClick}/>
    </div>
  </div>

  <div style={{ top: '60%', paddingLeft: "70%", zIndex: '1', position:'absolute' }}>
    <ProgressBar trigger={triggered} />
  </div>
</div>
</div>
</div>

  
  );
  }  

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;

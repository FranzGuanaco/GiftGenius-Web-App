import React, { useState } from 'react';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';

const Quiz = ({ question }) => {

  const [startAnimation, setStartAnimation] = useState(false);

  const handleQuestionBoxClick = () => {
    setStartAnimation(true);
    console.log('bouton quiz clické')
  };
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="ButtonBackStyle" style={{ position: "fixed", marginTop: '50%', marginLeft:'7%'}}>
        <ButtonBack />
        </div>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="NewsStyle" >
        <NewsBox />
      </div>
      <div className="QuestionStyle" style={{ textAlign: 'center', marginTop: '3%'}}>
        <h3>{question}</h3>
      </div>
      <div style={{left: '50%', marginTop:'2%', marginLeft: '22%',border: '2px solid red', padding: '10px', width:"50%", height:'50%' }}>
      <QuestionBox onClick={handleQuestionBoxClick} />
      <ProgressBar startAnimation={startAnimation}/>
      </div>
      <div  style={{ position: "fixed"}}>
      <ProgressBar startAnimation={startAnimation}/>
      </div>
      <div>
      </div>
    </div>
  );
}

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;

import React from 'react';
import Navbar from './Navbar/navbar';
import NewsBox from './NewsBox/NewsBox';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import Jauge from './Jauge/ProgessBar';
import ProgressBar from './Jauge/ProgessBar';

const Quiz = ({ question }) => {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="NewsStyle" >
        <NewsBox />
      </div>
      <div className="ButtonBackStyle" style={{ position: "fixed", marginTop: '50%', marginLeft:'7%'}}>
        <ButtonBack />
        </div>
      <div className="QuestionStyle" style={{ textAlign: 'center', marginTop: '3%'}}>
        <h3>{question}</h3>
      </div>
      <div style={{left: '50%', marginTop:'2%', marginLeft: '22%',border: '2px solid red', padding: '10px', width:"50%", height:'50%' }}>
        <QuestionBox/>
      </div>
      <div className="kk" style={{ position: "fixed"}}>
      <ProgressBar/>
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

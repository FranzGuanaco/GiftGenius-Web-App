import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBoxProps from './Question/QuestionBoxProps';

const NewQuiz = () => {
    const location = useLocation();
    const propositions = location.state?.propositions || []; // Récupération des propositions
    const questionText = location.state?.question || [];
    console.log(`newquiz voici les propostions ${propositions}`)

    return (
        <div className="App">
            <Navbar width={"100%"} style={{ top: '0', zIndex: '2' }} />

            <div className="Container">
                <div className="QuestionStyle">
                    <ButtonBack />
                </div>
                <div style={{ paddingLeft: '50px', textAlign: 'center' }}>
          <h3>{questionText}</h3>
        </div>
                {propositions.length > 0 ? (
                    propositions.map((propValue, propIndex) => (
                        <QuestionBoxProps key={propIndex} proposition={propValue} />
                    ))
                ) : (
                    <div style={{ top: '10%' }}>Chargement...</div>
                )}
            </div>
        </div>
    );
};

export default NewQuiz;



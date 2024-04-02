import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';
import questions from './QuizQuestion';
import answer from './QuizAnswers';
import { dbRealtime } from '../Firebase';
import { ref, get  } from "firebase/database";


const Quiz = ({ question }) => {

  const [triggered, setTriggered] = useState(false); // État pour contrôler le déclenchement
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState(questions[0].questionText)
  const [answerText, setAnswerText] = useState(answer[0].responses[0].answerText)

  useEffect(() => {
    setQuestionText(questions[currentIndex].questionText);
    // Ajustez ici selon la structure de votre données
    if (answer[0] && answer[0].responses && answer[0].responses[currentIndex]) {
      setAnswerText(answer[0].responses[currentIndex].answerText);
    }
  }, [currentIndex]);

  const handleQuestionBoxClick = (boxIndex) => {
    setTriggered(true);
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length && nextIndex < 7) {
      setCurrentIndex(nextIndex);
    } else if (nextIndex === 7 && boxIndex === 1) { // boxIndex === 1 signifie que c'est la deuxième QuestionBox qui a été cliquée
      console.log('Message spécial pour la deuxième QuestionBox à la 7ème question');
      setCurrentIndex(11)
    } else {
      console.log("Fin des questions");
    }
  };

  const handleButtonBackClick = () => {
    if (currentIndex > 0) {
    const backIndex = currentIndex - 1;
    setCurrentIndex(backIndex)
    console.log('backIndex')
    }
    else{
      console.log('pas de retour possible')
    }
  }

    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const starCountRef = ref(dbRealtime, 'Quiz/Budget');
        const snapshot = await get(starCountRef); // En supposant l'utilisation de `get` au lieu de `onValue`
        const newData = snapshot.val();
        const dataArray = Object.values(newData);
        setData(dataArray);
        console.log(dataArray)
      };
    
      fetchData();
    }, []);
    

  return (
    <div className="App">
    <Navbar width={"100%"} style={{ top: '0', zIndex: '2' }}></Navbar>
    
    <div className="Container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="QuestionStyle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: '10%' }}>
        <div style={{ position: 'absolute', left: '30%' }}> 
          <ButtonBack onClick={handleButtonBackClick}/>
        </div>
        <div style={{ paddingLeft: '50px', textAlign: 'center' }}> 
          <h3>{questionText}</h3>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div className="QuizStyle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh'}}>
          <div className="QuizGrid">
            {data.map((image, index) => (
              <div key={index} className="QuizItem">
                {/* Note: Le key={index} sur <QuestionBox> est redondant puisque vous l'avez déjà sur <div>. */}
                <QuestionBox onClick={() => handleQuestionBoxClick()}  imageUrl={image} />
              </div>
            ))}
          </div>
        </div>
      ) : <p>Chargement des données...</p>}
    </div>
    
    <div style={{ top: '60%', paddingLeft: "70%", zIndex: '1', position:'absolute' }}>
      <ProgressBar trigger={triggered} />
    </div>
  </div>
);
} 

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;


// Ajoutez de fausse image sur firebase
// faire le lien de firebase à l'interface
// regler taille des cases
// faire un map 
// trouver id pour verifier la reponse et faire une requete sql
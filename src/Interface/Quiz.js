import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';
import questions from './QuizQuestion';
import answer from './QuizAnswers';
import { dbRealtime } from '../Firebase';
import { ref, get  } from "firebase/database";
import { useProgressBar } from './Jauge/ProgressBarContext';


const Quiz = ({ question }) => {

  const [triggered, setTriggered] = useState(false); // État pour contrôler le déclenchement
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState(questions[0].questionText)
  const [answerText, setAnswerText] = useState(answer[0].responses[0].answerText)
  const [branch, setBranch] = useState(questions[0].theme) // ensemble des noms de branches
  const [data, setData] = useState({}); // donnée de chaque branche pour afficher les images correspondant à chaque question
  const { incrementProgressBar, decrementProgressBar } = useProgressBar();
  const [productData, setProductData] = useState([]);

  
  useEffect(() => {
    setQuestionText(questions[currentIndex].questionText);
    // Ajustez ici selon la structure de votre données
    if (answer[0] && answer[0].responses && answer[0].responses[currentIndex]) {
      setAnswerText(answer[0].responses[currentIndex].answerText);
    }
  }, [currentIndex]);


  // fonction pour passer a la question suivante
  const handleQuestionBoxClick = async (boxIndex, budgetMax, elementSelected, index) => {
    setTriggered(true);
    const nextIndex = currentIndex + 1;
    const nextTheme = questions[nextIndex].theme;
    setBranch(nextTheme);
    incrementProgressBar();
  
    try {
      const limitBudget = encodeURIComponent(budgetMax); // Utilisez budgetMax plutôt que budget pour l'encodage
      const url = `http://localhost:3001/api/quiz?limitBudget=${limitBudget}`;
      const response = await fetch(url);
      const data = await response.json();
      setProductData(data);
      console.log(`Voici les données pour le quiz avec un budget maximum de ${budgetMax}:`, productData); // Mettez à jour le message de console pour inclure le budgetMax
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  
    console.log(`Voici l'index de la boîte: ${boxIndex}`); // Corrigez la syntaxe pour afficher la boxIndex
  
    if (nextIndex < questions.length && nextIndex < 7) {
      setCurrentIndex(nextIndex);
    } else if (nextIndex === 7 && boxIndex === 1) {
      console.log('Message spécial pour la deuxième QuestionBox à la 7ème question');
      setCurrentIndex(11);
    } else {
      console.log("Fin des questions");
    } // Appel de la fonction fetchData() après la vérification des conditions
  };
  

  // fonctionn pour afficher les proposition de reponses
  useEffect(() => {
      const fetchData = async () => {
      const starCountRef = ref(dbRealtime, `Quiz/${branch}`);
      const snapshot = await get(starCountRef); // En supposant l'utilisation de `get` au lieu de `onValue`
      const newData = snapshot.val();
      setData(newData);
      console.log(newData)
      }; 
      fetchData();
    }, [branch]);
    

  // fonction pour retourner a la question precedente
  const handleButtonBackClick = () => {
    if (currentIndex > 0) {
    const backIndex = currentIndex - 1;
    const nextTheme = questions[backIndex].theme;
    setBranch(nextTheme); // changement du domaine de la question
    setCurrentIndex(backIndex)
    decrementProgressBar()
    console.log('backIndex')
    }
    else{
      console.log('pas de retour possible')
    }
  }

  // fonction pour filtrer les produit selon les reponses au quiz
  

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

      {Object.keys(data).length > 0 ? (
        <div className="QuizStyle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh'}}>
          <div className="QuizGrid">
            {Object.entries(data).map(([key, value], index) => (
              <div key={index} className="QuizItem">
                {/* Note: Le key={index} sur <QuestionBox> est redondant puisque vous l'avez déjà sur <div>. */}
                <QuestionBox onClick={() => handleQuestionBoxClick(value.answer, value.max, value.elementSelected, index)}  max={value.max} imageUrl={value.image} answer={value.answer} elementSelected={value.elementSelected}/>
              
              </div>
            ))}
          </div>
        </div>
      ) : <p>Chargement des données...</p>}
    </div>
    
    <div style={{ top: '60%', paddingLeft: "70%", zIndex: '1', position:'fixed' }}>
      <ProgressBar/>
    </div>
  </div>
);
} 

Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;


// 1- ajouter des produits de differents types
// 2_ faire les premieres requête avec le quiz et les api pour les quiz
// 3- trouver id pour verifier la reponse et faire une requete sql
// 4- gerer le flux des questions et des reponses
// 5- faire les differente branche du questionnaire dans Firebase
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';
import questions from './QuizQuestion';
import answer from './QuizAnswers';
import { dbRealtime } from '../Firebase';
import { ref, get } from "firebase/database";
import { useProgressBar } from './Jauge/ProgressBarContext';


const Quiz = () => {

  const [triggered, setTriggered] = useState(false); // État pour contrôler le déclenchement
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState(questions[0].questionText)
  const [branch, setBranch] = useState(questions[0].theme) // ensemble des noms de branches
  const [data, setData] = useState({}); // donnée de chaque branche pour afficher les images correspondant à chaque question
  const { incrementProgressBar, decrementProgressBar } = useProgressBar();
  const [productData, setProductData] = useState([]);



  useEffect(() => {
    setQuestionText(questions[currentIndex].questionText);
    // Ajustez ici selon la structure de votre données
    console.log(`VOIla Current Index: ${currentIndex}`);

  }, [currentIndex]);


  const handleQuestionBoxClick = async (boxIndex, elementToFilter, firstEntryKey) => {
    setTriggered(true); // Indique que la fonction a été déclenchée
    const nextIndex = currentIndex + 1;
    console.log(`Index suivant est égal à: ${nextIndex}`, `Current Index: ${currentIndex}`);

      // Vérification doit être faite ici avant d'incrémenter
      
  
    setCurrentIndex(nextIndex);
    setBranch(questions[nextIndex].theme);
    incrementProgressBar();
 
    // Tente de charger des données en fonction de la disponibilité de productData
    if (!productData.length && nextIndex < 3) {
      // Si aucune donnée produit et index inférieur à 3, charge des données
      await fetchQuizData(elementToFilter);
    } else if (productData.length && nextIndex === 2) {
      // Si données présentes et index à 2, procède à l'analyse des reviews
      await fetchAndProcessReviews(elementToFilter);
      if (elementToFilter === 'fete_des_peres_mere') {
        console.log("Attention, élément à filtrer est fête_des_pères_mère");
        setCurrentIndex(3);
        setBranch(questions[3].theme);
      }
    }
    if (currentIndex === 3){
      console.log(`nouvelle question sur sex currentIndex est égal à ${currentIndex}`);
    }
   
    // Gère le cas où l'index dépasse une certaine limite
    if (nextIndex > 10) {
     
    }
  };
  async function fetchQuizData(elementToFilter) {
    try {
      const limitBudget = encodeURIComponent(elementToFilter);
      const url = `http://localhost:3001/api/quiz/budget?limitBudget=${limitBudget}`;
      const response = await fetch(url);
      const data = await response.json();
      setProductData(data);
      console.log(`Données pour le quiz avec un budget maximum de ${elementToFilter}:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }
  
  async function fetchAndProcessReviews(elementToFilter) {
    try {
      const productIds = productData.map(product => product.product);
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/occasion?productIds=${encodeURIComponent(productIdsString)}&occasionType=${encodeURIComponent(elementToFilter)}`);
      const reviewsData = await reviewsResponse.json();
      console.log(`Résultat du deuxième filtre:`, reviewsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }
  

  // fonctionn pour afficher les proposition de reponses
  useEffect(() => {
      const fetchData = async () => {
      const starCountRef = ref(dbRealtime, `Quiz/${branch}`);
      const snapshot = await get(starCountRef); // En supposant l'utilisation de `get` au lieu de `onValue`
      const newData = snapshot.val();
      setData(newData);
      }; 
      fetchData();
    }, [branch]);
    

  // fonction pour retourner a la question precedente
  const handleButtonBackClick = () => {
    if (currentIndex > 0) {
        let stepBack = currentIndex === 3 ? 2 : 1;  // If currentIndex is 3, step back by 2, otherwise by 1
        const backIndex = currentIndex - stepBack;
        const nextTheme = questions[backIndex].theme;
        setBranch(nextTheme); // Update the question domain
        setCurrentIndex(backIndex);
        decrementProgressBar();
        console.log('backIndex', backIndex); // Log the new index
    } else {
        console.log('No backward movement possible');
    }
};


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
          {Object.entries(data).map(([branch, value], index) => {
            // Ici, nous prenons la première clé de l'objet de la branche
            
            const answer = value.answer;
            const elementToFilter = value.elementToFilter
            const image = value.image;

            if (!answer || !elementToFilter || !image) {
              return null; // Ceci va empêcher le rendu d'une QuestionBox pour des données manquantes ou incorrectes
            }

            return (
            <div key={index} className="QuizItem">
            <QuestionBox
                onClick={() => handleQuestionBoxClick(answer, elementToFilter, index)}
                filterBy={elementToFilter}
                imageUrl={image} // Change 'alternativeImageUrl' to your desired URL or logic
                answer={answer}
              />
              </div>
            );
            })}
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
// 2- faire les premieres requête avec le quiz et les api pour les quiz
// 3- trouver id pour verifier la reponse et faire une requete sql
// 4- gerer le flux des questions et des reponses
// 5- faire les differente branche du questionnaire dans Firebase
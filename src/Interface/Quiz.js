import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/navbar';
import ButtonBack from './ButtonBack/ButtonBack';
import QuestionBox from './Question/QuestionBox';
import ProgressBar from './Jauge/ProgessBar';
import questions from './QuizQuestion'; // feuille avec la liste des questions
import answer from './QuizAnswers';
import { dbRealtime } from '../Firebase';
import { ref, get } from "firebase/database";
import { useProgressBar } from './Jauge/ProgressBarContext';


const Quiz = () => {

  const [triggered, setTriggered] = useState(false); // État pour contrôler le déclenchement
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionText, setQuestionText] = useState(questions[0].questionText); // selection de la question
  const [branch, setBranch] = useState(questions[0].theme); // ensemble des noms de branches dans firebase
  const [data, setData] = useState({}); // donnée de chaque branche pour afficher les images correspondant à chaque question
  const { incrementProgressBar, decrementProgressBar } = useProgressBar();
  const [productData, setProductData] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answerData, setAnswerData] = useState(false);
  const [propositions, setPropositions] = useState([]); // État pour stocker les propositions de réponse

  useEffect(() => {
    console.log('Propositions mises à jour :', propositions);
    console.log('Type de propositions :', typeof propositions);
    console.log('Est-ce un tableau ?', Array.isArray(propositions));
    console.log('Contenu de propositions :', propositions);
    console.log(propositions.map((item) => item)); // Doit afficher les éléments
  }, [propositions]); 

  useEffect(() => {
    // Si currentIndex n'est pas 6, on utilise la question directement depuis le tableau
    if (currentIndex <=9) {
      setQuestionText(questions[currentIndex].questionText);
      console.log(`Question à l'index ${currentIndex}: ${questions[currentIndex].questionText}`);
    } else {
      // Si currentIndex est égal à 6, on appelle la fonction fetch pour récupérer le prompt via l'API
      const fetchPromptForQuestion = async () => {
        setIsLoading(true)
        
        try {

          const questionPrompt = 'Pose uniquement une question directement à l\'utilisateur pour déterminer quel cadeau parmi la liste ' + 
          'lui convient le mieux';
          // Remplacez ce texte par votre prompt pour les propositions de réponse
          const responsePrompt = 'Donne maximum 10 propositions (de 3 mots maximum) de réponses possibles à la question '+
          'en format array sans aucune formule d\'introduction il faut que cela permette d\'éliminer des élément de la liste';
          // Appel à l'API pour récupérer le prompt via Claude ou autre
          const questionResponse = await fetch(`http://localhost:3001/api/claude/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: questionPrompt}),    
        });
        

          if (!questionResponse.ok) {
            throw new Error(`Error Server responded with status ${questionResponse.status}`);
          }
          const questionData = await questionResponse.json();
          
          setQuestionText(questionData.generatedText);  // Mettre à jour le texte de la question avec la réponse de l'API
          console.log(`Question générée par Claude : ${questionData.generatedText}`);

          // Appel pour générer les propositions
          const propositionsResponse = await fetch(`http://localhost:3001/api/claude/generate/propositions`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ prompt: responsePrompt, contextQuestion: questionData.generatedText  }),
          });

          if (!propositionsResponse.ok) {
            throw new Error(`Error Server responded with status ${propositionsResponse.status}`);
              }

          const propositionsData = await propositionsResponse.json();
          setPropositions(JSON.parse(propositionsData.generatedText)); // Met à jour les propositions
          console.log(`Propositions générées par Claude : ${propositionsData.generatedText}`);


        } catch (error) {
          console.error("Erreur lors de la récupération du prompt via l'API :", error);
        }
        finally{
          setIsLoading(false)
          setAnswerData(true)
        }
      };
      fetchPromptForQuestion(); // Appel de la fonction asynchrone pour récupérer la question
    }
  }, [currentIndex]);  // Déclenche le useEffect à chaque changement de currentIndex
  


  const handleQuestionBoxClick = async (boxIndex, elementToFilter, secondElementToFilter) => {
    setTriggered(true); // Indique que la fonction a été déclenchée
    const nextIndex = currentIndex + 1;
    console.log(`Index suivant est égal à: ${nextIndex}`, `Current Index: ${currentIndex}`);
      // Vérification doit être faite ici avant d'incrémenter
    setCurrentIndex(nextIndex); // Vchangement pour passer à la question suivante grace au useffect plus haut
    setBranch(questions[nextIndex].theme);
    incrementProgressBar();
    console.log(`voici la branch de firebase ${branch}`)
    // Tente de charger des données en fonction de la disponibilité de productData
    if (!productData.length && nextIndex < 3) {
      // Si aucune donnée produit et index inférieur à 3, charge des données
      await fetchQuizData(elementToFilter, secondElementToFilter);
    } 
    else if (productData.length && nextIndex === 2) {
      // Si données présentes et index à 2, procède à l'analyse des reviews
      await fetchAndProcessReviews(elementToFilter);
      if (elementToFilter === 'fete_des_peres_mere') {
        console.log("Attention, élément à filtrer est fête_des_pères_mère");
        setCurrentIndex(3);
        setBranch(questions[3].theme);
      }
    }
    if (currentIndex === 3){
      await fetchQuizGender(elementToFilter);
      console.log(`nouvelle question sur sex currentIndex est égal à ${currentIndex}`);
    }

    if (currentIndex === 4){
      await fetchQuizAge(elementToFilter);
      console.log(`nouvelle question sur age currentIndex est égal à ${currentIndex}`);
    }

    if (currentIndex === 5){
      await fetchQuizPresentKind(elementToFilter);
      console.log(`nouvelle question sur le type de cadeau currentIndex est égal à ${currentIndex}`);
    }

    if (currentIndex === 6){
      await fetchQuizPresentType(elementToFilter);
      console.log(`fetchQuizPresentType nouvelle question sur le type de cadeau currentIndex est égal à ${currentIndex}`);
     
    }

    if (currentIndex === 7){
      await fetchQuizCategory(elementToFilter);
      console.log(`nouvelle question sur la categorie du cadeau currentIndex est égal à ${currentIndex}`);
      
    }

    if (currentIndex === 8){
      await fetchQuizSubcategory(elementToFilter);
      console.log(`nouvelle question sur la sous categorie du cadeau currentIndex est égal à ${currentIndex}`);
    }

    if (currentIndex === 9){
      await fetchQuizSubsubcategory(elementToFilter);
      console.log(`nouvelle question sur la sous sous categorie du cadeau currentIndex est égal à ${currentIndex}`);
    }
    
  };

  async function fetchQuizData(elementToFilter, secondElementToFilter) {
    try {
      const minBudget = encodeURIComponent(elementToFilter);
      const maxBudget = encodeURIComponent(secondElementToFilter);
      
      const response = await fetch(`http://localhost:3001/api/quiz/budget?minBudget=${minBudget}&maxBudget=${maxBudget}`);
      const data = await response.json();
      setProductData(data);
      console.log(`Data for the quiz with a maximum budget of ${secondElementToFilter}:`, data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }
  
  
  async function fetchAndProcessReviews(elementToFilter) {
    try {
      const productIds = productData.map(product => product.product_id); // recuperation des produits deja filtré par la requête anterieure
      console.log(`productIds:`, productIds);
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/occasion?productIds=${encodeURIComponent(productIdsString)}&occasionType=${encodeURIComponent(elementToFilter)}`);
      if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      setProductData(data);
      
      console.log(`Résultat du deuxième filtre:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }

  async function fetchQuizGender(elementToFilter) {
    try {
      const productIds = productData.map(product => product.product_id); // recuperation des produits deja filtré par la requête anterieure
      console.log(`productIds:`, productIds);
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/gender?productIds=${encodeURIComponent(productIdsString)}&sexe_destinataire=${encodeURIComponent(elementToFilter)}`);
      
      if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      setProductData(data);

      console.log(`Résultat du troisieme filtre:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }

  async function fetchQuizAge(elementToFilter) {
    try {
      const productIds = productData.map(product => product.product_id); // recuperation des produits deja filtré par la requête anterieure
      console.log(`productIds:`, productIds);
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/age?productIds=${encodeURIComponent(productIdsString)}&age_destinataire=${encodeURIComponent(elementToFilter)}`);
      
      if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      setProductData(data);

      console.log(`Résultat du quatrième filtre:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }

  async function fetchQuizPresentKind(elementToFilter) {
    try {
      const productIds = productData.map(product => product.product_id); // recuperation des produits deja filtré par la requête anterieure
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/present_kind?productIds=${encodeURIComponent(productIdsString)}&cadeau_type=${encodeURIComponent(elementToFilter)}`);
      if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      setProductData(data);
      console.log(`Résultat du cinquieme filtre:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }

  async function fetchQuizPresentType(elementToFilter) {  //practical or passion
    try {
      const productIds = productData.map(product => product.product_id); // recuperation des produits deja filtré par la requête anterieure
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/passion_practical?productIds=${encodeURIComponent(productIdsString)}&cadeau_type=${encodeURIComponent(elementToFilter)}`);
      if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      const productCat = productData.map(product => product.category); // recuperation des categories restantes apres le filtre
      setProductCat(productCat); // Sauvegarde les catégories de produits
      setProductData(data);
      console.log(`Résultat du sixieme filtre avec les categories restantes:`, productCat);
      console.log(`Résultat du sixieme filtre:`, data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reviews:", error);
    }
  }

  async function fetchQuizCategory(elementToFilter) {  
    try {
      const productIds = productData.map(product => product.product_id);
      const productIdIntegers = productIds.map(id => parseInt(id, 10));
      const productIdsString = productIdIntegers.join(',');
      const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/category?productIds=${encodeURIComponent(productIdsString)}&products_category=${encodeURIComponent(elementToFilter)}`);
    if (!reviewsResponse.ok) {
        throw new Error(`Server responded with status ${reviewsResponse.status}`);
      }
      const data = await reviewsResponse.json();
      setProductData(data);
      const productSubCat = productData.map(product => product.subcategory); 
      setProductCat(productSubCat); // Sauvegarde les catégories de produits
      console.log(`voici ce qu'affiche productcat`, productCat);
      console.log(`Résultat du septieme filtre:`, data);
     // recuperation des produits deja filtré par la requête anterieure
    
  } catch (error) {
    console.error("Erreur lors de la récupération des reviews:", error);
  }
  }
  

async function fetchQuizSubcategory(elementToFilter) {  //practical or passion
  try {
    const productIds = productData.map(product => product.product_id);
    const productIdIntegers = productIds.map(id => parseInt(id, 10));
    const productIdsString = productIdIntegers.join(',');
    const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/subcategory?productIds=${encodeURIComponent(productIdsString)}&products_subcategory=${encodeURIComponent(elementToFilter)}`);
    if (!reviewsResponse.ok) {
      throw new Error(`Server responded with status ${reviewsResponse.status}`);
    }
    const data = await reviewsResponse.json();
    setProductData(data);
    const productSubCat = productData.map(product => product.subsubcategory); 
    setProductCat(productSubCat); // Sauvegarde les catégories de produits
    console.log(`voici ce qu'affiche productcat`, productCat);
    console.log(`Résultat du sixieme filtre:`, data);
   // recuperation des produits deja filtré par la requête anterieure
  
} catch (error) {
  console.error("Erreur lors de la récupération des reviews:", error);
}
}

async function fetchQuizSubsubcategory(elementToFilter) {  //practical or passion
  try {
    const productIds = productData.map(product => product.product_id);
    const productIdIntegers = productIds.map(id => parseInt(id, 10));
    const productIdsString = productIdIntegers.join(',');
    const reviewsResponse = await fetch(`http://localhost:3001/api/quiz/s.subcategory?productIds=${encodeURIComponent(productIdsString)}&products_subcategory=${encodeURIComponent(elementToFilter)}`);
    if (!reviewsResponse.ok) {
      throw new Error(`Server responded with status ${reviewsResponse.status}`);
    }
    const data = await reviewsResponse.json();
    setProductData(data);
    const productSubCat = productData.map(product => product.subsubcategory); 
    setProductCat(productSubCat); // Sauvegarde les catégories de produits
    console.log(`voici ce qu'affiche productcat`, productCat);
    console.log(`Résultat du sixieme filtre:`, data);
   // recuperation des produits deja filtré par la requête anterieure
  
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
  <div className="QuizStyle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
    <div className="QuizGrid">
      {Object.entries(data).map(([branch, value], index) => {
        const answer = value.answer;
        const elementToFilter = value.elementToFilter;
        const secondElementToFilter = value.secondElementToFilter;
        const image = value.image;

        if (!answer || !elementToFilter || !image) {
          return null; // Empêche le rendu d'une QuestionBox pour des données manquantes ou incorrectes
        }

        if (currentIndex >= 11 && !productCat.includes(elementToFilter)) {
          return null; 
        }
        console.log("isLoading:", isLoading);
        console.log("answerData:", answerData);

        return (
          <div key={index} className="QuizItem">
          {isLoading ? (
            <>
              <div style={{top: '10%'}}>Chargement...</div>
              {console.log("Affichage du chargement car isLoading est true")}
            </>
          ) : answerData ? (
            <>
           {Array.isArray(propositions) && propositions.map((response, index) => (
            <QuestionBox
              key={index} // Une clé unique pour chaque élément
              onClick={() => handleQuestionBoxClick(answer, elementToFilter, secondElementToFilter, index)}
             
              answer={response} // Propriété réponse passée au composant 
            />
          ))}
            </>
          ) : (
            <QuestionBox
              onClick={() => handleQuestionBoxClick(answer, elementToFilter, secondElementToFilter, index)}
              filterBy={elementToFilter}
              imageUrl={image}
              answer={answer}
            />
          )}
        </div>        
        );
      })}
    </div>
  </div>
) : (
  <p>Chargement des données...</p>
)}

       </div>
      <div style={{ top: '60%', paddingLeft: "70%", zIndex: '1', position:'fixed' }}>
        <ProgressBar/>
      </div>
    </div>
    );} 


Quiz.defaultProps = {
  question: "Question par défaut", // Ajoutez votre valeur par défaut ici
};

export default Quiz;


// cocher les boutons
// reparer le retour qui fonctionne mal
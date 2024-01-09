import {React, useState, useEffect} from 'react';
import Navbar from './Navbar/navbar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';


export default function Homepage(props) {

  useEffect(() => {
    // Utilisez auth.onAuthStateChanged pour vérifier l'état de l'utilisateur
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // L'utilisateur est connecté
        var email = user.email;
        var uid = user.uid;
  
        console.log(`${uid} et ${email}`);
      } else {
        // L'utilisateur n'est pas connecté
        console.error('Utilisateur non connecté.');
      }
    });
  
    // N'oubliez pas de désabonner l'écouteur lorsque le composant est démonté
    return () => unsubscribe();
  }, []); // [] assure que cela ne fonctionne qu'une seule fois après le montage
  

  const navigate = useNavigate();

  const goToCategoyDetails = () => {
    navigate('/product details')
    console.log('test')
};
  
  return (

    <div className="App" style={{ flexDirection: 'column' }}>
      <Navbar ></Navbar>
    <div className="NumberofProd" style={{marginTop: '18vh', color: "#B7B7B7", letterSpacing: "3px", fontWeight:"60", fontSize:"11px", textAlign:"center" }}>
        <h3>{props.NumberOfProduct}</h3>
      </div>
      <div className="MenuStyle">
        <CategoryBox/>
      </div>

      <div className="MenuStyle" style={{ marginTop: "3%", width: "44%", marginLeft:"5%" }}>
        <ProductBox display={true} onclick={goToCategoyDetails}/>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
      <div className="QuizButtonContainer" style={{ position: "fixed", right: "0", top: "50%", transform: "translateY(-50%)"}}>
        <QuizButton />
      </div>
    </div>
  );
}

Homepage.defaultProps = {
  NumberOfProduct: "0 résultat trouvé"
};




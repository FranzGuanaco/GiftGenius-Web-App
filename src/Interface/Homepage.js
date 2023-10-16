import React from 'react';
import Navbar from './Navbar/navbar';
import MenuBar from './MenuBar/MenuBar';
import CategoryBox from './Category/Category';
import QuizButton from './QuizElement/QuizButton';
import NewsBox from './NewsBox/NewsBox';
import ProductBox from './ProductBox/ProductBox';
import PopUpStart from './Popup/PopUpStart';


export default function Homepage(props) {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="NavStyle">
        <Navbar />
      </div>
      <div className="NewsStyle" >
        <NewsBox />
      </div>
      <div className="MenuStyle" >
        <MenuBar/>
      </div>
      <div className="PopUpStartPosition"  style={{ position: "fixed", right: "30%", top: "20%", zIndex: 1}}>
      <PopUpStart PopUpStartText='test'/>
    </div>
      <div className="NumberofProd" style={{ paddingTop: "2%", color: "#B7B7B7", letterSpacing: "3px", fontWeight:"60", fontSize:"11px", textAlign:"center" }}>
        <h3>{props.NumberOfProduct}</h3>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%" }}>
        <CategoryBox style={{width: "44px" }}/>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
        <ProductBox style={{width: "44px" }}/>
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




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
      <Navbar width={"100%"} style={{ position: 'sticky', top: '0', zIndex: '100' }}></Navbar>
    <div className='page-NewsBox' style={{ paddingTop: '70px' }}>
      <NewsBox width={"100%"} style={{ position: 'sticky' }}></NewsBox>
    </div>
    <div className="NumberofProd" style={{ paddingTop: "2%", color: "#B7B7B7", letterSpacing: "3px", fontWeight:"60", fontSize:"11px", textAlign:"center" }}>
        <h3>{props.NumberOfProduct}</h3>
      </div>
      <div className="MenuStyle" style={{ paddingTop: "2%"}}>
        <CategoryBox width={"350px"} height={"40px"}/>
      </div>

      <div className="MenuStyle" style={{ paddingTop: "2%", width: "44%", marginLeft:"5%" }}>
        <ProductBox display={true}  width={"300px" }/>
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




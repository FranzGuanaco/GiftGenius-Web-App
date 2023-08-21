import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Interface/Homepage';
import Quiz from './Interface/Quiz';
import Proposal from './Interface/Proposal';
import Productdetails from './Interface/Productdetails';
import Categorydetails from './Interface/Categorydetails';
import './App.css';

function App() {

      return(
    
        <div className="App">
          <BrowserRouter>
          <Routes>
            <Route path='/Home' element={<Homepage/>} />
            <Route path='/quiz' exact element={<Quiz/>} />
            <Route path='/result' exact element={<Proposal/>} />
            <Route path='/product details' exact element={<Productdetails/>} />
            <Route path='/category details' exact element={<Categorydetails/>} />
            </Routes>
      </BrowserRouter>
      </div>
  );
  
}

export default App;

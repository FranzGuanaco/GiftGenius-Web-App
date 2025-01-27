import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Interface/Homepage';
import Quiz from './Interface/Quiz';
import Proposal from './Interface/Proposal';
import Productdetails from './Interface/Productdetails';
import Categorydetails from './Interface/Categorydetails';
import './App.css';
import Login from './Interface/Login';
import Confirmation from './Interface/Confirmation';
import Account from './Interface/Account';
import Match from './Interface/Match';
import CreateAccount from './Interface/CreateAccount';
import { BrandProvider } from './Interface/BrandContext';
import { AuthProvider } from './Interface/AuthContext';
import { ProgressBarProvider } from './Interface/Jauge/ProgressBarContext';
import MenuBar from './Interface/MenuBar/MenuBar';
import NewQuiz from './Interface/NewQuiz';

function App() {

      return(
    
        <div className="App">
          <AuthProvider>
            <BrandProvider>
            <ProgressBarProvider>
              <BrowserRouter>
                <Routes>
          
            <Route path='/' element={<><Homepage/></>} />
            <Route path='/quiz' exact element={<Quiz/>} />
            <Route path='/newquiz' exact element={<NewQuiz/>} /> quiz details
            <Route path='/product details' exact element={<Productdetails/>} /> afficher image, description, vendeur, prix, nom 
            <Route path='/login' exact element={<Login/>} />
            <Route path='/create account' exact element={<CreateAccount/>} />
            <Route path='/confirmation' exact element={<Confirmation/>} />
            <Route path='/account' exact element={<Account/>} />
            <Route path='/match' exact element={<Match/>} /> 
            
            </Routes>
          </BrowserRouter>
          </ProgressBarProvider>
        </BrandProvider>
      </AuthProvider>
      </div>
  );
  
}

export default App;

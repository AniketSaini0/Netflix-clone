import React from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import LoginScreen from './Screens/LoginScreen';


function App() {
  const user = null;
  return (
    <div className="app">
      <BrowserRouter>
        {!user ?
          (<Routes>
              <Route exact path="/" element={<LoginScreen />}/>
          </Routes>
          ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>)
        }

      </BrowserRouter>
    </div>
  );
}

export default App;

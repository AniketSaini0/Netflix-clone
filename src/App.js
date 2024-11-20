import React from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
} from "react-router-dom"


function App() {
  const user = null;
  return (
    <div className="app">
      <BrowserRouter>
        {!user ?
          (<Routes>
          <Route exact path="/" element={<h1>wow this is test route</h1>}/>
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

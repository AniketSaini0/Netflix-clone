import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import LoginScreen from './Screens/LoginScreen';
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';


function App() {
  const user = useSelector(selectUser);
  //this is for dispatching actions to fetch of set the state of user in the userSlice
  const dispatch = useDispatch();

  //this is for keeping the login state still even after refresh.
  useEffect(() => {
    //unsubscribe is, so if new user logs in, the older one gets overridden.
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //Logged in
        // console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }else{
        //Logged out
        dispatch(logout);
      }
    })

    return unsubscribe;
  }, [])

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

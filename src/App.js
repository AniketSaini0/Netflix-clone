import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
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
      if (userAuth) { //If user is logged in
        //Logged in
        // console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        })
        );
      } else { //when user is logged out
        //Logged out
        console.log("dispatch logout is triggered");
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {!user ?
            (
              <Route exact path="*" element={<LoginScreen />} />
            ) : (
              <>
                <Route exact path="/" element={<HomeScreen />} />
                <Route exact path="/profile" element={<ProfileScreen />} />
              </>
            )
          }
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;

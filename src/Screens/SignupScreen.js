import React, { useRef } from 'react';
import "./SignupScreen.css";
import { auth } from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


function SignupScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //function for registering the user
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
     ).then((authUser) => {
        console.log(authUser);
      }).catch((error) => {
        alert(error.message);
      });
  }

  //function for signing in with existing user.
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value  
    ).then((authUser) => {
      console.log(authUser);
    }).catch((error) => {
      alert(error.message);
    })
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} id='email__input' type="email" placeholder='Email or mobile number' required />
        <input ref={passwordRef} id='password__input' type='password' placeholder='Password' required />
        <button id='signin__button' type="submit" onClick={signIn}>
          Sign In
        </button>
        {/* <h3>OR</h3>
        <button id='signinCode__button' type="submit">Use a sign-in code</button>
        <div className="signInScreen__forgotPassword">Forgot password?</div>
        <label className='signinScreen__label'>
          <input type="checkbox" className='signInScreen__rememberMe' />  Remember me
        </label> */}
        <h4>
          <span className="signupScreen__gray">
            New to Netflix?
          </span>
          <span className="signupScreen__link" onClick={register} > Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  )
}

export default SignupScreen

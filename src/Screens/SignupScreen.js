import React from 'react'
import "./SignupScreen.css"

function SignupScreen() {

  const register = (e) => {
    e.preventDefault();
  };

  const signIn = (e)=> {
    e.preventDefault();
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input id='email__input' type="email" placeholder='Email or mobile number' />
        <input id='password__input' type='password' placeholder='Password' />
        <button id='signin__button' type="submit" onClick={signIn}>Sign In</button>
        {/* <h3>OR</h3>
        <button id='signinCode__button' type="submit">Use a sign-in code</button>
        <div className="signInScreen__forgotPassword">Forgot password?</div>
        <label className='signinScreen__label'>
          <input type="checkbox" className='signInScreen__rememberMe' />  Remember me
        </label> */}
        <h4>
          <span className="signupScreen__gray">New to Netflix?</span>
          <span  className="signupScreen__link" onClick={register} > Sign Up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignupScreen

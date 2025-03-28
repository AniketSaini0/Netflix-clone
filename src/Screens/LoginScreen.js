import React from "react";
import { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://imgs.search.brave.com/u64eTM4vcbC4jxYB5KRamAlo4KkVE2kKyXbtbXHXsGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbmV0ZmxpeC9z/bWFsbC9uZXRmbGl4/X1BORzMyLnBuZw"
          alt=""
          loading="lazy"
          fetchpriority="high"
        />
        <button
          onClick={() => setSignIn(true)}
          className={"loginScreen__button"}
        >
          Sign In
        </button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <>
            <SignupScreen />
          </>
        ) : (
          <>
            <h1>Unlimited films, TV Programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => {
                    setSignIn(true);
                  }}
                  className="loginScreen__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
        {/* <div className="loginScreen_bgBlack"/> */}
      </div>
    </div>
  );
}

export default LoginScreen;

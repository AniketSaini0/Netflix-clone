import React, { useState, useEffect } from 'react';
import "./Navbar.css";

function Navbar() {
    //Visibility state of Navrbar    
    const [show, handleShow] = useState(false);
    //Function for making navbar disappear after scrolling
    const transitionNavBar = () => {
        if (window.scrollY > 130) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        //CleanUp function
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []/*this mean the code will only run when the component mounts*/)

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img className="nav__logo"
                    src="https://imgs.search.brave.com/pB7rmF0nJIRrC9TeIkUEjCoOrOx8oh-ZcEy8Qci1QgA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n"
                    alt="netflix-logo"
                />

                <img className="nav__avatar"
                    src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Navbar

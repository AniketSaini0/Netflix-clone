import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

function Navbar() {

    //this is when we click on the profile icon, it should render the ProfileScreen
    const navigate = useNavigate();

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
                    onClick={() => navigate("/")}
                    src="https://imgs.search.brave.com/pB7rmF0nJIRrC9TeIkUEjCoOrOx8oh-ZcEy8Qci1QgA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n"
                    alt="netflix-logo"
                />

                <img className="nav__avatar"
                    onClick={() => navigate("/profile")}
                    src="https://imgs.search.brave.com/oQQTwl5cscHd0BIaUN8VMmcBueQpp1Q52rQONS6wpHs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdiL2M1/LzAzLzdiYzUwMzNj/NzRhOTZhMTYxZjEy/ODNkZTUwNmI4MTdj/LmpwZw"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Navbar

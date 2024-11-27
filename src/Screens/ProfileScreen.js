import React from 'react';
import Nav from "../Navbar";
import './ProfileScreen.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import PlanScreen from './PlanScreen';


function ProfileScreen() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    return (
        <div className='profileScreen'>
            <Nav />
            <div className="profileScreen__body">
                <h2>Edit Profile</h2>
                <div className="profileScreen__info">
                    <img src="https://imgs.search.brave.com/oQQTwl5cscHd0BIaUN8VMmcBueQpp1Q52rQONS6wpHs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdiL2M1/LzAzLzdiYzUwMzNj/NzRhOTZhMTYxZjEy/ODNkZTUwNmI4MTdj/LmpwZw"
                        alt="" />

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="prfileScreen__plans">
                            <h3>Plans</h3>
                            <PlanScreen/>
                            <button
                                onClick={() => auth.signOut().then(() => {
                                    navigate('/');
                                    console.log('User signed out successfully.');
                                })}
                                className="profileScreen__signOut">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen

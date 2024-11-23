import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from "./axios";
import requests from './Requests';

function Banner() {
    const[userId, setUserId] = useState([false])

    //this below is to set the state of the banner movie
    const [movie, setMovie] = useState([]);/*this is an empty array initially*/
    //for fetching the movie in the banner.
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            //setting the movie from the request object.
            setMovie(
                request.data.results[
                //finding a random movie fro, the array of movies in the request object.
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie)

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }
    const base_url = "https://image.tmdb.org/t/p/original/";
    return (
        <header className="banner"
            style={{
                //backgroundImage: `url("https://imgs.search.brave.com/0L4S3-MOAI75y7acG-SJQ8wtG4g3HVG6OX6_4yMzoUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC8xL2Iv/OC8xMTY0OTItMjU2/MHgxNDg4LWRlc2t0/b3AtaGQtbmV0Zmxp/eC1iYWNrZ3JvdW5k/LWltYWdlLmpwZw")`,
                backgroundImage: `url("${base_url + movie?.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }
            }>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <div className="banner__description">
                    {truncate(movie?.overview, 180)}
                </div>
            </div>
            {/*This is for making a fade effect at the bottom of the banner */}
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner

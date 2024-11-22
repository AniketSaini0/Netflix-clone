import React from 'react';
import "./HomeScreen.css";
import Navbar from '../Navbar';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';


function HomeScreen() {
    return (
        <div className='homeScreen'>
            <Navbar />

            <Banner user_id="false" />

             <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
             <Row title="Trending Now" fetchUrl={requests.fetchTopRated}/>
             <Row title="Top Rated" fetchUrl={requests.fetchTrending}/>
             <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
             <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
             <Row title="Horror MOvies" fetchUrl={requests.fetchHorrorMovies}/>
             <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
             <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
             
        </div>
    )
}

export default HomeScreen

//https://api.trakt.tv/shows/trending
//https://api.trakt.tv/oauth/authorize?response_type=code&client_id=%20&redirect_uri=%20&state=%20

const API_KEY =
  "e19b091475c97c24c434e5837c44da9e";

const requests = {
  fetchTrending: `trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}& with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const metaData = [
  {
    title: "Trending Now",
    url: `${requests.fetchTrending}`,
  },
  {
    title: "Top Rated",
    url: `${requests.fetchTopRated}`,
  },
  {
    title: "Action Movies",
    url: `${requests.fetchActionMovies}`,
  },
  {
    title: "Comedy Movies",
    url: `${requests.fetchComedyMovies}`,
  },
  {
    title: "Horror Movies",
    url: `${requests.fetchHorrorMovies}`,
  },
  {
    title: "Romance Movies",
    url: `${requests.fetchRomanceMovies}`,
  },
  {
    title: "Documentaries",
    url: `${requests.fetchDocumentaries}`,
  },
];

export default requests;

//this is how it will work => baseURL + fetchTrending = complete URL.
//https://api.themoviedb.org/3/movie/top_rated?api_key=e19b091475c97c24c434e5837c44da9e&language=en-US

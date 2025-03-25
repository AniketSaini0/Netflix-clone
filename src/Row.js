import React, {
  useState,
  useEffect,
} from "react";
import "./Row.css";
import "./Requests";
import requests from "./Requests";
import axios from "./axios";
import MovieSkeleton from "./Screens/movieSkeleton";

function Row({
  title,
  fetchUrl,
  isLargeRow = false,
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] =
    useState(true);

  const base_url =
    "https://image.tmdb.org/t/p/original/";

  //this is for fetching all the movies under that category
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setIsLoading(false);
      return request;
    }
    fetchData();
  }, []);
  //here we have all the movies
  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* we need to iterate over all the movies , ifLargeRow is given then we need to use movie.poster_path */}
        {isLoading && <MovieSkeleton count={5} />}
        {!isLoading &&
          movies.map(
            (movie, i) =>
              //This condition is to avoid breaks(means render only those movie posters which are available according tot he conditions.)
              ((isLargeRow &&
                movie.poster_path) ||
                (!isLargeRow &&
                  movie.backdrop_path)) && (
                <>
                  <div
                    className="row__element"
                    key={i}
                  >
                    <img
                      className={`row__poster ${
                        isLargeRow &&
                        "row__posterLarge"
                      }`}
                      key={movie.id}
                      src={`${base_url}${
                        isLargeRow
                          ? movie.poster_path
                          : movie.backdrop_path
                      }`}
                      alt={movie.name}
                    />
                    <div className={`row__title`}>
                      {isLargeRow
                        ? ""
                        : movie.title
                        ? movie.title
                        : movie.name}
                    </div>
                  </div>
                </>
              )
          )}
      </div>
    </div>
  );
}

export default Row;

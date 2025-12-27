import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError(true);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {error && <p>Something went wrong. Please try again.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
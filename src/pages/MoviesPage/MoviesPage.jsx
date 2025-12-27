import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
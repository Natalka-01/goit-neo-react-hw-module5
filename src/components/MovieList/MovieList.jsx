import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation(); // Capture current location to pass in state

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          {/* We pass the current location in 'state' so we can return here later */}
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
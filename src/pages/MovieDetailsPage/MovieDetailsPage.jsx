import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation, NavLink } from "react-router-dom";
import { fetchMovieDetails } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  
  // Use useRef to persist the 'from' location across re-renders
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) return <p>Loading details...</p>;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backBtn}>← Go back</Link>
      
      <div className={css.movieCard}>
        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450"} 
          alt={movie.title} 
          className={css.poster}
        />
        <div className={css.info}>
          <h1>{movie.title} ({movie.release_date.split("-")[0]})</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul className={css.nav}>
          <li><NavLink to="cast" className={css.link}>Cast</NavLink></li>
          <li><NavLink to="reviews" className={css.link}>Reviews</NavLink></li>
        </ul>
        <Suspense fallback={<div>Loading sub-info...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../movies-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  
  
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
      <hr />
      <h3>Additional information</h3>
      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
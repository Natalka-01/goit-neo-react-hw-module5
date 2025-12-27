import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [movieId]);

  if (cast.length === 0) return <p>No information about the cast.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://placehold.co/100x150?text=No+Image"
            } // Use placehold.co instead
            alt={actor.name}
            className={css.photo}
          />
          <p className={css.name}>{actor.name}</p>
          <p className={css.char}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

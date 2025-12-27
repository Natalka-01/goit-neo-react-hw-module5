import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies-api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieCast(movieId);
      setCast(data);
    };
    getData();
  }, [movieId]);

  if (cast.length === 0) return <p>We don't have any cast info for this movie.</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
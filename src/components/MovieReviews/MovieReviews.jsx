import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  // Get movieId from the URL parameters
  const { movieId } = useParams();
  
  // State for storing reviews list
  const [reviews, setReviews] = useState([]);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no movieId, don't make a request
    if (!movieId) return;

    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch reviews from our API service
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  // Show loading message while fetching
  if (isLoading) return <p className={css.status}>Loading reviews...</p>;

  // Show error message if something went wrong
  if (error) return <p className={css.status}>{error}</p>;

  // If request finished but reviews array is empty
  if (reviews.length === 0) {
    return <p className={css.status}>We don't have any reviews for this movie.</p>;
  }

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <h4 className={css.author}>Author: {review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
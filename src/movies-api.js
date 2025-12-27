import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2Q5MDRmYzdhZDA0NDcwNjNkNTBjNGM2YmM3NGFjNCIsIm5iZiI6MTc2Njg2NTc5NC4wMjcsInN1YiI6IjY5NTAzYjgyZWE3NzVkMTQ2OGIxZTY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PwZbv3nqU38pSa058MHpot5ulGyIESKcgiEk1uIME1g";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;

export const fetchTrendingMovies = async () => {
  // Fetching trending movies for the HomePage
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  // Searching movies by keyword for the MoviesPage
  const response = await axios.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  // Fetching full info for MovieDetailsPage
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  // Fetching cast information
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  // Fetching user reviews
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

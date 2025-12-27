import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";

// Lazy loading pages to optimize bundle size
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />
      
      {/* Suspense is required for lazy loaded components */}
      <Suspense fallback={<div className={css.loader}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            {/* Nested routes for MovieDetailsPage */}
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
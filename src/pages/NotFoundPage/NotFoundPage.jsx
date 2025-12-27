import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.message}>
        Oops! The page you are looking for does not exist.
      </p>
      {/* Link to return the user to the home page */}
      <Link to="/" className={css.homeLink}>
        Go back to Home Page
      </Link>
    </div>
  );
}
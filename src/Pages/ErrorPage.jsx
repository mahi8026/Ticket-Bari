// src/pages/ErrorPage.jsx
import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Log error details for debugging

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen text-center bg-base-200 p-8"
    >
      <h1 className="text-7xl font-extrabold text-error">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-base-content mb-8">
        Sorry, an unexpected error has occurred, or the page you requested does
        not exist.
      </p>

      {/* Optional: Show specific error if routed via loader/action */}
      <p className="text-sm text-gray-500 italic mb-6">
        {error.statusText || error.message}
      </p>

      <Link to="/" className="btn btn-primary btn-lg">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;

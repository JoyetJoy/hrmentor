import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg font-semibold">
        Sorry, an unexpected error has occurred.
      </p>
      {error?.statusText || error?.message ? (
        <p className="mt-2 text-base text-gray-600">
          <i>{error.statusText || error.message}</i>
        </p>
      ) : (
        <p className="mt-2 text-base text-gray-600">
          <i>404 - Page Not Found</i>
        </p>
      )}
      <Link to="/" className="mt-5 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

import React from 'react';
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Oops! Page Not Found.</h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/" // Link to the homepage
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
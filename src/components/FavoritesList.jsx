import React from "react";
import MovieCard from "./MovieCard";

const FavoritesList = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Your Favorites{" "}
        <span className="text-gray-500">({favorites.length})</span>
      </h2>
      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {movie.Title}
                </h3>
                <p className="text-sm text-gray-500">{movie.Year}</p>
              </div>
              <button
                onClick={() => onToggleFavorite(movie)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No favorites yet. Search for movies and add them to your favorites!
        </p>
      )}
    </div>
  );
};

export default FavoritesList;

import React from "react";

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative pt-[150%]">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <button
          onClick={() => onToggleFavorite(movie)}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full ${
            isFavorite
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-white/80 hover:bg-white"
          } transition-colors`}
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="font-semibold text-gray-900 truncate">{movie.Title}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-600">{movie.Year}</span>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

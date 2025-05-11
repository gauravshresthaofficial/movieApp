import React from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({
  movies,
  currentPage,
  totalResults,
  onPageChange,
  favorites,
  onToggleFavorite,
  viewMode,
}) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {totalResults > 10 && viewMode === "all" && (
        <div className="flex items-center justify-center mt-8 space-x-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieLists;

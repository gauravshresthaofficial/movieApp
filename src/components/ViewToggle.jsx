import React from "react";

const ViewToggle = ({ viewMode, setViewMode, hasFavorites }) => {
  if (!hasFavorites) return null;

  return (
    <div className="flex justify-center space-x-2 mb-6">
      <button
        onClick={() => setViewMode("all")}
        className={`px-4 py-2 rounded-md transition-colors ${
          viewMode === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Movies
      </button>
      <button
        onClick={() => setViewMode("favorites")}
        className={`px-4 py-2 rounded-md transition-colors ${
          viewMode === "favorites"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Only Favorites
      </button>
    </div>
  );
};

export default ViewToggle;

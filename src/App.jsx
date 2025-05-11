import React, { useState, useEffect } from "react";
import MovieLists from "./components/MovieLists";
import FavoritesList from "./components/FavoritesList";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";
import ViewToggle from "./components/ViewToggle";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [notification, setNotification] = useState({ show: false, text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("movieFavorites")) || []
  );
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'favorites'

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
    if (favorites.length === 0) {
      setViewMode("all");
    }
  }, [favorites]);

  const showNotification = (text, duration = 2000) => {
    setNotification({ show: true, text });
    setTimeout(() => setNotification({ show: false, text: "" }), duration);
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
      showNotification("Removed from favorites");
    } else {
      setFavorites([...favorites, movie]);
      showNotification("Added to favorites");
    }
  };

  const handleSearch = async (page = 1) => {
    if (!searchText.trim()) {
      showNotification("Please enter a movie name");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchText}&page=${page}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setCurrentPage(page);
      } else {
        showNotification(data.Error || "No results found");
        setMovies([]);
        setTotalResults(0);
      }

      if (viewMode === "favorites" && favorites.length == 0) {
        setViewMode("all");
      }
    } catch (error) {
      showNotification("Error fetching data. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / 10)) {
      handleSearch(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredMovies =
    viewMode === "favorites"
      ? movies.filter((movie) =>
          favorites.some((fav) => fav.imdbID === movie.imdbID)
        )
      : movies;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
            Movie Search & Favorites
          </h1>
          <p className="text-lg text-gray-600">
            Search and save your favorite movies
          </p>
        </header>

        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={() => handleSearch(1)}
          isLoading={isLoading}
        />

        <ViewToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          hasFavorites={favorites.length > 0}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="flex-1">
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-600">Loading movies...</p>
              </div>
            )}

            {!isLoading && filteredMovies.length > 0 && (
              <MovieLists
                movies={filteredMovies}
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={handlePageChange}
                favorites={favorites}
                viewMode={viewMode}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {!isLoading && movies.length === 0 && searchText && (
              <div className="text-center py-12 text-gray-600">
                No movies found. Try a different search.
              </div>
            )}
          </div>

          {favorites.length > 0 && (
            <div className="lg:w-80">
              <FavoritesList
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          )}
        </div>

        {notification.show && <Notification text={notification.text} />}
      </div>
    </div>
  );
};

export default App;

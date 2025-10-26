import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import FavoritesList from "./components/FavoritesList";
import MovieDetailsModal from "./components/MovieDetailsModal";
import { searchMovies, getMovieById } from "./utils/api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  async function handleSearch(q) {
    setError("");
    if (!q) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await searchMovies(q);
      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No results");
      } else {
        setMovies(data.Search || []);
      }
    } catch (e) {
      setError(`Failed to fetch: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.imdbID === movie.imdbID);
      if (exists) return prev.filter((m) => m.imdbID !== movie.imdbID);
      return [movie, ...prev];
    });
  }

  async function openDetails(imdbID) {
    setSelectedId(imdbID);
    setSelectedMovie(null);
    try {
      const data = await getMovieById(imdbID);
      if (data.Response === "False") {
        setError(data.Error || "Failed to fetch details");
      } else {
        setSelectedMovie(data);
      }
    } catch (e) {
      setError(`Failed to fetch details: ${e.message}`);
    }
  }

  function closeDetails() {
    setSelectedId(null);
    setSelectedMovie(null);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Search & Favorites</h1>
      </header>

      <main className="container">
        <div className="left">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          {error && <div className="error">{error}</div>}
          <MovieGrid
            movies={movies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetails={openDetails}
          />
        </div>

        <aside className="right">
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetails={openDetails}
          />
        </aside>
      </main>

      {selectedId && (
        <MovieDetailsModal
          movie={selectedMovie}
          isLoading={!selectedMovie}
          onClose={closeDetails}
          isFavorite={favorites.some((f) => f.imdbID === selectedId)}
          onToggleFavorite={() => {
            if (selectedMovie) toggleFavorite({ imdbID: selectedMovie.imdbID, Title: selectedMovie.Title, Poster: selectedMovie.Poster, Year: selectedMovie.Year });
          }}
        />
      )}

      <footer className="footer">
        <small>Powered by OMDb API</small>
      </footer>
    </div>
  );
}
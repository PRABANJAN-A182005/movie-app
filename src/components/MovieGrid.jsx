import React from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, favorites, onToggleFavorite, onOpenDetails }) {
  if (!movies || movies.length === 0) {
    return <div className="empty">No search results — try a different query.</div>;
  }

  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
          onToggleFavorite={() => onToggleFavorite(m)}
          onOpenDetails={() => onOpenDetails(m.imdbID)}
        />
      ))}
    </div>
  );
}

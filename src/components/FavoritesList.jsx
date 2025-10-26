import React from "react";
import MovieCard from "./MovieCard";

export default function FavoritesList({ favorites, onToggleFavorite, onOpenDetails }) {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty">No favorites yet — add some movies!</div>
      ) : (
        <div className="fav-list">
          {favorites.map((m) => (
            <MovieCard
              key={m.imdbID}
              movie={m}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(m)}
              onOpenDetails={() => onOpenDetails(m.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

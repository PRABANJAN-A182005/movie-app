import React from "react";

const PLACEHOLDER = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23ddd'/%3E%3Ctext x='50%' y='50%' fill='%23888' font-size='20' dominant-baseline='middle' text-anchor='middle'%3ENo Poster%3C/text%3E%3C/svg%3E";

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onOpenDetails }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER;

  return (
    <div className="card">
      <div className="poster-wrap" onClick={onOpenDetails} role="button" tabIndex={0}>
        <img src={poster} alt={`${movie.Title} poster`} />
      </div>
      <div className="card-body">
        <div className="title">{movie.Title}</div>
        <div className="year">{movie.Year}</div>
        <div className="actions">
          <button className="fav" aria-pressed={isFavorite} onClick={onToggleFavorite}>
            {isFavorite ? "★ Remove" : "☆ Favorite"}
          </button>
          <button onClick={onOpenDetails} className="details">Details</button>
        </div>
      </div>
    </div>
  );
}

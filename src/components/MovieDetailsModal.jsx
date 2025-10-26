import React from "react";

export default function MovieDetailsModal({ movie, isLoading, onClose, isFavorite, onToggleFavorite }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {isLoading ? (
          <div className="modal-loading">Loading...</div>
        ) : movie ? (
          <div className="modal-content">
            <div className="modal-left">
              <img src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : ""} alt={movie.Title} />
            </div>
            <div className="modal-right">
              <h2>{movie.Title} <small>({movie.Year})</small></h2>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              <div className="modal-actions">
                <button onClick={onToggleFavorite}>{isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}</button>
                <button onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-error">Details not available.</div>
        )}
      </div>
    </div>
  );
}

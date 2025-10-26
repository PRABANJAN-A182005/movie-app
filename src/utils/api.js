const KEY = import.meta.env.VITE_OMDB_KEY;
const BASE = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  if (!query) return { Response: "False", Error: "Empty query" };
  const res = await fetch(`${BASE}?apikey=${KEY}&s=${encodeURIComponent(query)}&type=movie`);
  return res.json();
}

export async function getMovieById(imdbID) {
  const res = await fetch(`${BASE}?apikey=${KEY}&i=${imdbID}&plot=full`);
  return res.json();
}

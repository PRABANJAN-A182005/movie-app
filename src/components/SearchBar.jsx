import React, { useState } from "react";

export default function SearchBar({ onSearch, isLoading }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="search" onSubmit={submit}>
      <input
        aria-label="Search movies"
        placeholder="Search movies (e.g. Batman)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
      <button
        type="button"
        className="clear"
        onClick={() => {
          setValue("");
          onSearch("");
        }}
      >
        Clear
      </button>
    </form>
  );
}

import React, { useState } from "react";
import "./searchComponent.css";

const SearchComponent = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
    // setSearchQuery("");
    console.log(searchQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search content..."
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;

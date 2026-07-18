import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ search, setSearch }) => {

  return (

    <div className="searchBar">

      <FaSearch className="searchIcon" />

      <input
        type="text"
        placeholder="Search Patient Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

  );

};

export default SearchBar;

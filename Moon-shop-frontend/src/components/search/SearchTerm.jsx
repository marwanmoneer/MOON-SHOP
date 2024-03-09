// SearchTerm.jsx

import React from "react";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styles from "./SearchTerm.module.css";
import { useSearch } from "../../context/FilterContext";

const SearchTerm = () => {
  // Access the navigate function from the react-router-dom library
  const navigate = useNavigate();
  // Access the handleSearch function from the useSearch context hook
  const { handleSearch } = useSearch();

  // Function to handle Enter key press, triggering search navigation
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Navigate to the "/search" route when Enter key is pressed
      navigate("/search");
    }
  };

  return (
    // Container for the search input field and search button
    <div className={styles.relative}>
      {/* Input field for searching with dynamic placeholder text */}
      <input
        type="text"
        name="search"
        // Call handleSearch function on input change to update search query
        onChange={(e) => handleSearch(e.target.value)}
        className="input-field"
        placeholder="search"
        // Call handleKeyPress function on key down to handle Enter key press
        onKeyDown={handleKeyPress}
      />
      {/* Button for triggering search navigation */}
      <button
        // Navigate to the "/search" route when the button is clicked
        onClick={(e) => navigate("/search")}
        // Call handleKeyPress function on key down to handle Enter key press
        onKeyDown={handleKeyPress}
        type="submit"
        className={styles.button_icon}
      >
        {/* Search icon component */}
        <GoSearch className='search-icon' /> 
      </button>
    </div>
  );
};

export default SearchTerm;

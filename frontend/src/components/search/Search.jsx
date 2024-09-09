import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ courses }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    console.log("Search Query:", query); 
  
    if (query.length > 0) {
      const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredCourses);
      console.log("Filtered Courses:", filteredCourses); 
    } else {
      setSearchResults([]);
      console.log("No results"); 
    }
  };
  
  
  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          name="search_box"
          required
          placeholder="search courses..."
          maxLength="100"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="button" className="fas fa-search"></button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results-container">
          <ul className="search-results">
            {searchResults.map((course, index) => (
              <li key={index}>
                <Link to={course.link}>{course.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

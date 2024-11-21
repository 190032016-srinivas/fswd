import React, { useContext } from "react";
import "../App.css";
import { GlobalData } from "../utils/GlobalData";
import { useNavigate, useParams } from "react-router-dom";

export function SearchBar() {
  const { searchValue, setSearchValue } = useContext(GlobalData);
  const navigate = useNavigate();
  const { category } = useParams();
  return (
    <form className="search-form">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          if (!category) {
            // going to browse if not already in it to get max possible results
            navigate("/browse/All");
          }
          setSearchValue(e.target.value);
        }}
        placeholder="Search..."
        className="search-input"
      />
    </form>
  );
}

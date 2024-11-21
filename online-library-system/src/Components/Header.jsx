import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { GlobalData } from "../utils/GlobalData";

export function Header() {
  const [homeSelected, setHomeSelected] = useState(true);
  const [browseSelected, setBrowseSelected] = useState(false);
  const [addSelected, setAddSelected] = useState(false);
  const { setFilterValue, setSearchValue } = useContext(GlobalData);
  let params = useParams();
  const navigate = useNavigate();
  const url = useLocation();

  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    if (selectedGenre) {
      navigate(`/browse/${selectedGenre}`);
    }
  };
  //these are all the genres as of now
  const genres = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Mystery|Thriller",
  ];

  useEffect(() => {
    // setting category based on dynamic routes
    if (params.category) {
      setSelectedGenre(params.category);
    } else {
      setSelectedGenre("");
    }
    //below part sets the tabs of navbar based on what is selected and what is clicked
    if (params.category) {
      setHomeSelected(false);
      setBrowseSelected(true);
      setAddSelected(false);
    } else if (params.title) {
      setHomeSelected(false);
      setBrowseSelected(true);
      setAddSelected(false);
    } else if (url.pathname === "/Add") {
      setHomeSelected(false);
      setBrowseSelected(false);
      setAddSelected(true);
    } else {
      setHomeSelected(true);
      setBrowseSelected(false);
      setAddSelected(false);
    }
  }, [params.category, params.selected, params.title, url.pathname]);

  return (
    <div id="mainHeader">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div className="headerLinksUnfocused" style={{ fontSize: "1.3rem" }}>
          Srinu's library
        </div>
        <div>welcomes you explorer!</div>
      </div>
      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        <div className="dropdown-container">
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleChange}
            tabIndex={-1}
          >
            <option value="" disabled>
              Category
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/"
          onClick={() => {
            setFilterValue("");
            setSearchValue("");
          }}
          className={
            homeSelected ? "headerLinksFocused" : "headerLinksUnfocused"
          }
        >
          Home
        </Link>
        <Link
          to="/browse/All"
          className={
            browseSelected ? "headerLinksFocused" : "headerLinksUnfocused"
          }
        >
          Browse
        </Link>
        <Link
          to="/Add"
          onClick={() => {
            setFilterValue("");
          }}
          className={
            addSelected ? "headerLinksFocused" : "headerLinksUnfocused"
          }
        >
          Add Book
        </Link>
      </div>
    </div>
  );
}

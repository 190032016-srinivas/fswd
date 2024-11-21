import "./App.css";
import React from "react";
import { Header } from "./Components/Header";
import { Heading } from "./Components/Heading";
import { Outlet } from "react-router-dom";
import { SearchBar } from "./Components/SearchBar";
import { useLocation } from "react-router-dom";
function App() {
  const url = useLocation();
  return (
    <div>
      <Header />
      {/* conditionally rendering the search bar  */}
      {(url.pathname === "/" || url.pathname.startsWith("/browse/")) && (
        <SearchBar />
      )}
      {/* conditionally rendering the heading  */}
      {(url.pathname === "/" || url.pathname === "/Add") && <Heading />}
      <Outlet />
    </div>
  );
}

export default App;

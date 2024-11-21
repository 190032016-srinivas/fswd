import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PublicIcon from "@mui/icons-material/Public";
import "../CssFiles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../GlobalData";
import { resetCartFromDb } from "../CartSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/shoppyGlobeLogo.png";
const Header = () => {
  const noOfCartItmes = useSelector((state) => state.cart.cartItems).length;
  const { searchValue, setSearchValue } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let ismounted = false;

  async function getAllCartItems() {
    try {
      if (!ismounted) return;
      let token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3000/cart/${localStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) navigate("/login");
        return;
      } else {
        const formattedResponse = await response.json();
        dispatch(resetCartFromDb(formattedResponse));
      }
    } catch (error) {
      console.log("error in fetching cart items form db=", error);
    }
  }

  useEffect(() => {
    ismounted = true;
    getAllCartItems();
    return () => {
      console.log("cleanup func called ");
      ismounted = false;
    };
  }, []);
  return (
    <header className="header">
      <div className="logo">
        <PublicIcon sx={{ marginRight: "0.5rem", fontSize: "2rem" }} />
        <div className="logo-name">ShoppyGlobe.in</div>
        {/* <img
          src={logo}
          style={{
            width: "150px",
          }}
          alt="logo man"
        /> */}
      </div>
      <div className="right-section">
        <Link to={"/login"} className="cart" title="Logout">
          <div className="cart-icon">
            <LogoutIcon sx={{ color: "white" }} />
          </div>
        </Link>
        <Link to={"/"}>
          <button className="home-button">Home</button>
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div className="search-icon">
            {searchValue.length > 0 && (
              <CloseIcon
                onClick={() => {
                  setSearchValue("");
                }}
              />
            )}
          </div>
        </div>
        <Link to={"/cart"} className="cart" title="Cart">
          <div className="cart-icon">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </div>
          {noOfCartItmes > 0 && (
            <div className="cart-count">{noOfCartItmes}</div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

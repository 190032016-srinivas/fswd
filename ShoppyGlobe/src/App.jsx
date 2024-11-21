import React, { useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import CustomSnackbar from "./Components/CustomSanckbar";
import { GlobalContext } from "./GlobalData";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ArrowBack from "./Components/ArrowBack";
const App = () => {
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };
  const url = useLocation();
  const navigate = useNavigate();
  const { bypassRef } = useContext(GlobalContext);
  // useEffect(() => {
  //   if (url.pathname != "/") {
  //     navigate("/");
  //   }
  //   window.addEventListener("beforeunload", function (e) {
  //     if (bypassRef.current) {
  //       bypassRef.current = false;
  //       return;
  //     }
  //     e.preventDefault();
  //     e.returnValue =
  //       "Are you sure you want to leave? Your changes are not saved.";
  //   });
  // }, []);
  return (
    <div className="the-main-div">
      <Header />
      {url.pathname != "/" && <ArrowBack />}
      <Outlet />
      <CustomSnackbar />
      {/* this scrolls the page to the top for the next components */}
      <ScrollRestoration />
    </div>
  );
};

export default App;

import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../CssFiles/ArrowBack.css";

const ArrowBack = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="arrow-bar">
      <ArrowBackIcon
        sx={{ fontSize: "2.5rem" }}
        className="arrow-icon"
        onClick={handleBackClick}
      />
    </div>
  );
};

export default ArrowBack;

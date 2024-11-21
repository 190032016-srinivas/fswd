import React, { useContext } from "react";
import "../CssFiles/PriceDetailsCard.css";
import { GlobalContext } from "../GlobalData";
import { Link } from "react-router-dom";

const PriceDetailsCard = ({ price, discount, amountPayable }) => {
  return (
    <div className="price-details-card">
      <h2>Price Details</h2>
      <div>
        {" "}
        <hr />
      </div>{" "}
      <div className="price-details">
        <div className="price-item">
          <span>Price:</span>
          <span>${price}</span>
        </div>
        <div className="price-item">
          <span>Discount:</span>
          <span>-${discount}</span>
        </div>
        <div className="price-item total">
          <span>Total:</span>
          <span>${amountPayable}</span>
        </div>
      </div>
      <div>
        {" "}
        <hr />
      </div>
      <Link to={"/checkout"} style={{ alignSelf: "end" }}>
        <button className="place-order-button">Place Order</button>
      </Link>
    </div>
  );
};

export default PriceDetailsCard;

import React, { useContext, useState } from "react";
import "../CssFiles/CheckOut.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, deleteCartCompletelyAsync } from "../CartSlice";
import { GlobalContext } from "../GlobalData";
function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { setSearchValue } = useContext(GlobalContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Order Placed!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
    // dispatch(clearCart());
    dispatch(deleteCartCompletelyAsync());
    setSearchValue("");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Shipping Information</h3>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip Code"
              required
            />
          </div>
        </div>

        <h3>Payment Information</h3>
        <div className="form-group">
          <input
            type="number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="Expiry (MM/YY)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              required
            />
          </div>
        </div>

        {/* <h3>Order Summary</h3>
        <div className="order-summary">
          <p>Item 1: $50</p>
          <p>Item 2: $25</p>
          <p>
            <strong>Total: $75</strong>
          </p>
        </div> */}

        <button type="submit" className="checkout-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;

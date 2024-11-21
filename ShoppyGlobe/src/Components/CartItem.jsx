import React, { useState } from "react";
import ".././CssFiles/CartItem.css";
import { useDispatch } from "react-redux";
import {
  decrementCount,
  deleteCartItemAsync,
  incrementCount,
  removeFromCart,
  updateCartItmeAsync,
} from "../CartSlice";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const handleIncrease = (id) => {
    // dispatch(incrementCount(id));
    dispatch(updateCartItmeAsync({ id: id, newCount: cartItem.quantity + 1 }));
  };
  const handleDecrease = (id) => {
    // dispatch(decrementCount(id));
    if (cartItem.quantity < 2) {
      dispatch(deleteCartItemAsync(id));
    } else {
      dispatch(
        updateCartItmeAsync({ id: id, newCount: cartItem.quantity - 1 })
      );
    }
  };
  const handleDelete = (id) => {
    // dispatch(removeFromCart(id));
    dispatch(deleteCartItemAsync(id));
  };

  return (
    <div className="cart-item">
      <img src={cartItem.images[0]} alt="cart" className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-name">{cartItem.title}</div>
        <div className="cart-item-category">{cartItem.category}</div>
        <div className="cart-item-price">${cartItem.price}</div>
        <div className="cart-item-quantity">
          <button
            className="quantity-button"
            onClick={() => {
              handleDecrease(cartItem.id);
            }}
          >
            -
          </button>
          <span>{cartItem.quantity}</span>
          <button
            className="quantity-button"
            onClick={() => {
              handleIncrease(cartItem.id);
            }}
          >
            +
          </button>
        </div>

        <div
          className="cart-item-delete"
          onClick={() => {
            handleDelete(cartItem.id);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default CartItem;

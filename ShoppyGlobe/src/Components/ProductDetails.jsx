import React, { useContext, useEffect, useState } from "react";
import "../CssFiles/ProductDetails.css";
import LoadingComponent from "./LoadingComponent";
import useFetchCartItems from "../CustomHooks/useFetchProductDetails";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalData";
import { useDispatch } from "react-redux";
import { addToCart, addToCartAsync } from "../CartSlice";
import { ErrorElement } from "./ErrorElement";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  function makeClone(product) {
    const clone = structuredClone(product);
    clone.id = clone._id;
    delete clone._id;
    clone.quantity = 1;
    clone.userId = localStorage.getItem("userId");

    return clone;
  }
  const { globalProducts, setSnackbarOpen, setSnackbarMessage } =
    useContext(GlobalContext);

  async function getProductDetails() {
    try {
      if (productId.length !== 24) return;
      let token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          navigate("/login");
        }
        return;
      } else {
        const formattedResponse = await response.json();
        setProduct(formattedResponse.productFromDb);
      }
    } catch (error) {
      console.log("error in login =", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div className="main-pd-container">
      {product && (
        <div className="product-details-container">
          <div className="image-container">
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image"
            />
            <button
              className="add-to-cart-button"
              onClick={() => {
                dispatch(
                  addToCartAsync({ cartItemCopy: makeClone(product), navigate })
                );
                setSnackbarMessage(`${product.title} added to cart`);
                setSnackbarOpen(true);
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-category">{product.category}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-discount">
              Discount: {product.discountPercentage}%
            </div>
            <div className="product-rating">Rating: {product.rating}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-availability">
              Availability: {product.availabilityStatus}
            </div>
            <div className="product-return-policy">
              Return Policy: {product.returnPolicy}
            </div>
            <div className="product-warranty">
              Warranty: {product.warrantyInformation}
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingComponent />}
      {!loading && !product && <ErrorElement />}
    </div>
  );
};

export default ProductDetails;

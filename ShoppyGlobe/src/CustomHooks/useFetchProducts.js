import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetchProducts = (
  setProducts,
  setLoading,
  setError,
  setGlobalProducts
  // https://dummyjson.com/products
  // http://localhost:3000/products
) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 403) {
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
        setGlobalProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
};

export default useFetchProducts;

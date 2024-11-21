import { useState, useEffect } from "react";
// unused hook we can use this if we dont want to store the products in global context
// this is very slow as for every product you have to make another api call
const useFetchCartItems = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        for (let product of data.products) {
          if (product.title == target) {
            setProduct(product);
            break;
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
};

export default useFetchCartItems;

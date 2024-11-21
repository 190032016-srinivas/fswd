import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import useFetchProducts from "../CustomHooks/useFetchProducts";
import "../App.css";
import LoadingComponent from "./LoadingComponent";
import { GlobalContext } from "../GlobalData";
import FetchError from "./FetchError";
const Homepage = () => {
  const { setGlobalProducts, searchValue, bypassRef } =
    useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  // we are storing the products data here in the compoenents state but it should be stored in the global context for sharing
  // so we are storing it here and also in global for product details page to access
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reloadPage = async () => {
    bypassRef.current = true;
    window.location.reload();
  };

  useFetchProducts(setProducts, setLoading, setError, setGlobalProducts);
  // this useeffect is for setting filteredProducts
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  // this useeffect is for setting products
  useEffect(() => {
    if (searchValue == "") {
      // resetting the producst
      setFilteredProducts(products);
    }
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, products]);
  return (
    <div className="products-parent-card">
      {!loading &&
        !error &&
        filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      {loading && <LoadingComponent />}
      {error && <FetchError message={error} onRetry={reloadPage} />}
      {!loading && !error && filteredProducts.length == 0 && (
        <div className="fetch-error-container">
          sorry no results, try a different search word
        </div>
      )}
    </div>
  );
};

export default Homepage;

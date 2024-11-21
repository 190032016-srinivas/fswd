import React from "react";
import "../CssFiles/FetchError.css";

const FetchError = ({ message, onRetry }) => {
  return (
    <div className="fetch-error-container">
      <div className="fetch-error-message">
        <h2>Oops! Something went wrong.</h2>
        <p>
          {message || "We couldn't fetch the data. Please try again later."}
        </p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FetchError;

import { useState } from "react";
import ".././App.css";
import { Link, useParams } from "react-router-dom";
export function RenderBook({ book }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        border: "2px solid aqua",
        borderRadius: "10px",
        overflow: "hidden",
        width: "195px",
        height: "300px",
        position: "relative",
        transition: "opacity 0.3s ease",
        boxShadow: isHovered
          ? "0 4px 20px rgba(0, 255, 255, 0.5)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      id="book-container"
      // using states to display and undisplay the book details
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundImage: `url(${book.image})`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s ease",
          opacity: isHovered ? 0.1 : 1,
        }}
        id="book-image"
      />
      <div
        style={{
          margin: "10px",
          width: "90%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          color: "white",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        id="book-details"
      >
        <p>{book.title}</p>
        <p>{book.author}</p>
        <p>{book.rating}⭐</p>
        <p>{book.genre}</p>
        <Link to={`/book/${book.title}`}>View Details</Link>
      </div>
    </div>
  );
}

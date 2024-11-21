import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

const BookDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Access the books from the Redux store
  const books = useSelector((state) => state.books.allBooks);

  // Find the book by title
  const book = books.find((b) => b.title === title);

  if (!book) {
    return (
      <div className="book-details">
        <button onClick={() => navigate("/browse/All")}>Back to Browse</button>
        <h1>Book not found</h1>
      </div>
    );
  }

  return (
    <div className="book-details">
      <button onClick={() => navigate("/browse/All")}>Back to Browse</button>
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Rating:</strong> {book.rating}⭐
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
    </div>
  );
};

export default BookDetails;

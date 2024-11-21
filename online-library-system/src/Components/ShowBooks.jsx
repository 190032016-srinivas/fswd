import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RenderBook } from "./RenderBook";
import { GlobalData } from "../utils/GlobalData";

export function ShowBook() {
  const { category } = useParams();
  const allBooks = useSelector((state) => state.books.allBooks); // Access books from Redux store
  const [selectedGenre, setSelectedGenre] = useState("");
  const { searchValue } = useContext(GlobalData);
  useEffect(() => {
    // Update the selected genre based on the params
    if (category) {
      setSelectedGenre(category);
    } else {
      setSelectedGenre(""); // Reset to default if no category
    }
  }, [category]);

  // Filter books based on selected genre and search value
  let filteredBooks = allBooks;

  if (selectedGenre && selectedGenre !== "All") {
    filteredBooks = filteredBooks.filter((x) => x.genre === selectedGenre);
  }

  if (searchValue !== "") {
    filteredBooks = filteredBooks.filter((x) => {
      return (
        x.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.author.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }
  console.log("asfasf", allBooks.slice(15, 25));
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 60,
        marginTop: "20px",
      }}
    >
      {category
        ? filteredBooks.map((book) => {
            return <RenderBook key={book.description} book={book} />;
          })
        : allBooks
            .slice(15, 25)
            .reverse()
            .map((book) => {
              return <RenderBook key={book.description} book={book} />;
            })}
      {filteredBooks.length === 0 && "No results match in this category"}
    </div>
  );
}

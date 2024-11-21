import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../utils/Bookslice";
import { useNavigate } from "react-router-dom";
import { GlobalData } from "../utils/GlobalData";

export function CreateBookForm() {
  // using ref instead of state to save rerenders
  const titleRef = useRef("");
  const authorRef = useRef("");
  const descriptionRef = useRef("");
  const ratingRef = useRef("");
  const coverImageRef = useRef("");
  const genreRef = useRef("");

  const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery/Thriller"];
  const { setSearchValue, defaultValues, picIdx, setPicIdx } =
    useContext(GlobalData);
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books.allBooks);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPicIdx(picIdx + 1); // Increment the index for the default image
    setSearchValue("");
    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
      rating: ratingRef.current.value,
      image: coverImageRef.current.value,
      genre: genreRef.current.value,
    };

    // Dispatch action to update the Redux store
    dispatch(setBooks([newBook, ...allBooks]));

    // Clear the input fields
    titleRef.current.value = "";
    authorRef.current.value = "";
    ratingRef.current.value = "";
    coverImageRef.current.value = defaultValues[picIdx.current % 3]; // infinite loop to never run out of images
    genreRef.current.value = "";
  };

  const navigate = useNavigate();
  let flag = useRef(0);
  useEffect(() => {
    // bypassing the first render
    if (flag.current > 0) navigate("/browse/All");
    else flag.current++;
  }, [allBooks]);

  return (
    <div>
      <form
        style={{
          border: "2px solid aqua",
          borderRadius: "10px",
          width: "30%",
          margin: "0 auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          font: "inherit",
          fontSize: "inherit",
          marginTop: "30px",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ fontSize: "1.5rem" }}>Add New Book</div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            ref={titleRef}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            ref={authorRef}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            ref={descriptionRef}
            required
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          ></textarea>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="text"
            ref={ratingRef}
            required
            pattern="^(?:[1-4](?:\.\d)?|5(\.0)?)$" // Matches numbers like 1.0, 3.9, 4.5, and 5.0
            title="Please enter a number between 1.0 and 5.0"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input
            defaultValue={defaultValues[picIdx % 3]}
            type="url"
            ref={coverImageRef}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ fontSize: "0.8rem" }}>
          Above URL is in case you don't have a cover image, please use your own
          image URL.
        </div>
        <div>
          <label>Genre:</label>
          <select
            ref={genreRef}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

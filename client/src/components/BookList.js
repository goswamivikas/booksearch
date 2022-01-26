/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import React from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

function BookList({ books }) {
  return books ? (
    <div
      css={{
        "@media (min-width: 800px)": {
          // backgroundColor: "#000",
          // color: "#fff",
          gridTemplateColumns: "1fr 1fr",
        },
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "1fr",
        marginTop: "1rem",
      }}
    >
      {books?.items.map((book) => (
        <Link
          to={`/book/${book.id}`}
          key={book.id}
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <BookCard key={book.id} book={book} />
        </Link>
      ))}
    </div>
  ) : (
    <div>No Books</div>
  );
}

export default BookList;

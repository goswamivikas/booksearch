/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import BookList from "components/BookList";

import * as React from "react";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  const [status, setStatus] = React.useState("loading");
  const [books, setBooks] = React.useState(null);

  React.useEffect(() => {
    if (!queried) return;
    fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=20&q=${value}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setQueried(false);
      });
  }, [value, queried]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("queried");
    setQueried(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      css={{
        "@media (min-width: 480px)": {
          // backgroundColor: "#000",
          // color: "#fff",
          // gridTemplateColumns: "1fr 1fr",
          width: "80%",
        },
        width: "100%",
        // border: "2px solid green",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search books"
          name="search"
          onChange={handleInputChange}
          value={value}
          autoComplete="off"
          css={{
            border: "1px solid #f1f1f4",
            lineHeight: 1.5,
            width: "100%",
            background: "#f1f2f7",
            padding: "5px 10px",
          }}
        />
        <button
          type="submit"
          css={{
            border: "0",
            position: "relative",
            background: "transparent",
            cursor: "pointer",
            lineHeight: "1",
            margin: "-30px",
          }}
        >
          <BsSearch css={{}}></BsSearch>
        </button>
      </form>
      {books?.totalItems > 0 ? (
        <>
          <p css={{ padding: "1rem", fontSize: "12px", color: "grey" }}>
            {" "}
            Showing 1-{Math.min(20, books?.totalItems)} of {books?.totalItems}{" "}
            matches
          </p>
          <BookList books={books} />
        </>
      ) : queried ? (
        <p>Loading...</p>
      ) : books?.totalItems === 0 ? (
        <p>No Matches Found.</p>
      ) : null}
    </div>
  );
}

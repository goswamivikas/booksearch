/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import BookList from "components/BookList";

import * as React from "react";
import { BsSearch } from "react-icons/bs";
import * as constants from "utils/constants";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  const [status, setStatus] = React.useState(constants.STATUS.idle);
  const [books, setBooks] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!queried) return;
    if (value === "") {
      setBooks(null);
      setQueried(false);
      return;
    }
    setStatus(constants.STATUS.loading);
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
        setStatus(constants.STATUS.success);
      })
      .catch((e) => {
        console.log(e);
        setError(error);
        setStatus(constants.STATUS.error);
        setBooks(null);
      });
  }, [value, queried, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueried(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const totalItems = books?.totalItems;

  const searchMessage = () => {
    if (queried && value === "")
      return "Please type a keyword to get the results";
    if (status === constants.STATUS.idle) return;
    if (status === constants.STATUS.loading) return "loading...";
    if (status === constants.STATUS.error) return error?.message;
    if (status === constants.STATUS.success) {
      return totalItems > 0
        ? `Showing 1-${Math.min(20, totalItems)} of ${totalItems} matches`
        : "no matches found";
    }
  };

  return (
    <div
      css={{
        "@media (min-width: 480px)": {
          width: "80%",
        },
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search books"
          name="search"
          onChange={handleInputChange}
          value={value}
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
      <p css={{ padding: "1rem", fontSize: "12px", color: "grey" }}>
        {searchMessage()}
      </p>
      {status === constants.STATUS.success && totalItems > 0 ? (
        <BookList books={books} />
      ) : (
        <div
          css={{
            width: "100%",
            display: "flex",
            paddingTop: "20vh",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
            color: "#E2E2E2",
          }}
        >
          <p>booksearch</p>
          <p>app</p>
        </div>
      )}
    </div>
  );
}

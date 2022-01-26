/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import React from "react";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import * as C from "utils/constants";

const getBookProps = (book) => {
  return {
    id: book?.id,
    title: book?.volumeInfo?.title,
    subtitle: book?.volumeInfo?.subtitle,
    smallThumbnail: book?.volumeInfo?.imageLinks?.smallThumbnail,
    thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
    averageRating: book?.volumeInfo?.averageRating,
    pageCount: book?.volumeInfo?.pageCount,
    authors: book?.volumeInfo?.authors,
    ratingsCount: book?.volumeInfo?.ratingsCount,
    description: book?.volumeInfo?.description,
    publisher: book?.volumeInfo?.publisher,
    publishedDate: book?.volumeInfo?.publishedDate,
    category: book?.volumeInfo?.categories?.[0],
    language: book?.volumeInfo?.language || "",
  };
};

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

function Book() {
  const params = useParams();
  const [status, setStatus] = React.useState("idle");
  const [book, setBook] = React.useState(null);
  const {
    id,
    title,
    subtitle,
    thumbnail,
    averageRating,
    pageCount,
    authors,
    ratingsCount,
    description,
    publisher,
    publishedDate,
    category,
    language,
  } = getBookProps(book);

  React.useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${params?.bookId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      });
  }, [params]);

  const getReviewSummaryEl = () => {
    return (
      <div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            fontSize: "13px",
            justifyContent: "center",
          }}
        >
          <img
            css={{ width: "18px", marginRight: "5px" }}
            src="https://img.icons8.com/ios-glyphs/30/000000/rating.png"
            alt="start"
          ></img>
          {averageRating ? (
            averageRating
          ) : (
            <p css={{ color: "GrayText" }}>NA</p>
          )}
        </div>
        <p css={{ textAlign: "center", fontSize: "10px" }}>
          {ratingsCount ? ratingsCount : 0} reviews
        </p>
      </div>
    );
  };

  const getPageCountEl = () => {
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p css={{ fontSize: "13px" }}>{pageCount ? pageCount : "NA"}</p>
        <p css={{ textAlign: "center", fontSize: "10px" }}>Pages</p>
      </div>
    );
  };
  if (!book) return <div>Loading Book..</div>;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div css={{ display: "flex", justifyContent: "center" }}>
        <div
          css={{
            display: "grid",
            gap: "1rem",
            width: "100vw",
            padding: "2rem",
            maxWidth: "820px",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas:
              "'card card' 'description description' 'bookinfo bookinfo'",
            "@media (min-width: 660px)": {
              gridTemplateAreas: "'card bookinfo' 'description description'",
            },
          }}
        >
          <div
            css={{
              border: "",
              display: "grid",
              height: "10rem",
              gridTemplateColumns: "40% 60%",
              borderRadius: "5px",
              justifyItems: "center",
              gridColumn: "1 / 3",
              gridArea: "card",
            }}
          >
            <div css={{ border: "", height: "inherit", width: "6rem" }}>
              <img
                css={{
                  height: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                src={thumbnail || C.IMAGE_BACKUP}
                alt="book"
              />
            </div>
            <div css={{ border: "", padding: "1rem", position: "relative" }}>
              <h4 css={{ padding: "", color: "#2A293E", fontWeight: "500" }}>
                {title}
              </h4>
              <p
                css={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  overflow: "hidden",
                  color: "#3C4043",
                  padding: "2px 0px",
                }}
              >
                {subtitle?.substring(0, 100)}
              </p>
              <p
                css={{ color: "#1A73E8", fontSize: "14px", padding: "5px 0px" }}
              >
                {authors?.slice(0, 2)?.join(", ")}
              </p>
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  width: "8rem",
                  position: "absolute",
                  bottom: "1rem",
                }}
              >
                {getReviewSummaryEl()}
                <div
                  css={{ borderRight: "1px solid grey", height: "20px" }}
                ></div>
                {getPageCountEl()}
              </div>
            </div>
          </div>
          <div
            css={{
              borderTop: "1px solid #E7E7EA",
              paddingTop: "1rem",
              fontSize: "15px",
              gridColumn: "1 / 3",
              gridArea: "description",
              textAlign: "justify",
            }}
          >
            {description ? parse(description) : "No Description Available"}
          </div>
          <div
            css={{
              borderTop: "1px solid #E7E7EA",
              paddingTop: "1rem",
              fontSize: "15px",
              gridColumn: "1 / 3",
              gridArea: "bookinfo",
              "@media (min-width: 660px)": {
                borderTop: "0",
                borderLeft: "0.1px solid #E7E7EA",
                padding: "1rem",
              },
            }}
          >
            <h4 css={{ fontWeight: "500" }}>Book Info</h4>
            {infoItem("Publisher", publisher)}
            {infoItem("Publish Date", publishedDate)}
            {infoItem("Category", category)}
            {infoItem("Language", languageNames.of(language))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

const ErrorFallback = () => {
  console.log("ErrorFallbacl");
  return (
    <div>
      <p>
        Something went wrong while loading book details.{" "}
        <Link to="/">Go Home</Link>{" "}
      </p>
    </div>
  );
};

const infoItem = (key, value) => {
  return (
    <div
      css={{ display: "flex", padding: "5px", justifyContent: "space-between" }}
    >
      <p css={{ paddingRight: "2rem" }}>{key}</p>
      <p>{value ? value : "_ _"}</p>
    </div>
  );
};

export default Book;

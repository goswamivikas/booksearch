/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import React from "react";
import { FaRegStar } from "react-icons/fa";
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
  };
};

function BookCard({ book }) {
  const {
    id,
    title,
    subtitle,
    smallThumbnail,
    thumbnail,
    averageRating,
    pageCount,
    authors,
  } = getBookProps(book);
  console.log(title);
  return (
    <div
      css={{
        border: "",
        display: "grid",
        // gap: "1rem",
        height: "10rem",
        gridTemplateColumns: "6rem auto",
        borderRadius: "5px",
        backgroundColor: "#F8F8FA",
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
      <div css={{ border: "", padding: "1rem" }}>
        <h4 css={{ padding: "", color: "#2A293E", fontWeight: "400" }}>
          {title}
        </h4>
        <p css={{ color: "#BAC2CC", fontSize: "15px" }}>
          {authors?.slice(0, 2)?.join(", ")}
        </p>
        <div css={{ margin: "10px auto" }}>
          <div
            css={{ display: "flex", alignItems: "center", fontSize: "13px" }}
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
        </div>
        <p
          css={{
            fontWeight: "normal",
            fontSize: "13px",
            overflow: "hidden",
          }}
        >
          {subtitle?.substring(0, 100)}
        </p>
      </div>
    </div>
  );
}

export default BookCard;

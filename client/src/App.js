/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import Home from "screens/Home";
import Book from "screens/Book";
import { Link } from "react-router-dom";

function App() {
  return (
    <div
      css={{
        // border: "1px dashed grey",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2vh",
      }}
    >
      <Home></Home>
    </div>
  );
}

export default App;

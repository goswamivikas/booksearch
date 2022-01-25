/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import Home from "screens/Home";

function App() {
  return (
    <div
      css={{
        border: "1px dashed grey",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30vh",
      }}
    >
      <Home></Home>
    </div>
  );
}

export default App;

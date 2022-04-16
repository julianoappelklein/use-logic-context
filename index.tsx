import React from "react";
import ReactDOM from "react-dom";
import { App } from "./src/App";
import { WishlistLogicContextProvider } from "./src/useWishlistLogic";


ReactDOM.render(
  <React.StrictMode>
    <WishlistLogicContextProvider>
      <App />
    </WishlistLogicContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
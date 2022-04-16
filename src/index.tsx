import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { WishlistLogicContextProvider } from "./useWishlistLogic";


ReactDOM.render(
  <React.StrictMode>
    <WishlistLogicContextProvider>
      <App />
    </WishlistLogicContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
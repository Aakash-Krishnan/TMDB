// import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

// styles
import "./index.css";

// components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

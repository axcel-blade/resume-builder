/* src/main.jsx */

import React from "react";
import ReactDOM from "react-dom/client";
import RouterProvider from "./core/router/RouterProvider";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
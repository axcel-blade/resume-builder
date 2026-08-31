/* src/core/router/RouterProvider.jsx */

import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function RouterProvider({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

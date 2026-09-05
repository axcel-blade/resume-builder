import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../api/auth-context";
import ErrorBoundary from "../components/ErrorBoundary";

export default function RouterProvider({ children }) {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// src/components/ProtectedRoute.jsx
import React from "react";
import BlockedScreen from "./BlockedScreen";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <BlockedScreen />;
}

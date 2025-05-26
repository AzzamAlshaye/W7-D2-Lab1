// src/routes/Router.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import BMICalculator from "../pages/BMICalculator";
import ProtectedRoute from "../pages/ProtectedRoute";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, // no protection here
    children: [
      { index: true, element: <LoginPage /> }, // public
      { path: "login", element: <LoginPage /> }, // public
      { path: "register", element: <Register /> }, // public

      {
        path: "home", // protected
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bmi", // protected
        element: (
          <ProtectedRoute>
            <BMICalculator />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

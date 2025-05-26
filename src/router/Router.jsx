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

function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },

      // Protected
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bmi",
        element: (
          <ProtectedRoute>
            <BMICalculator />
          </ProtectedRoute>
        ),
      },

      // Fallback
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

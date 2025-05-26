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
      { index: true, element: <LoginPage /> }, // "/"
      { path: "login", element: <LoginPage /> }, // "/login"
      { path: "home", element: <HomePage /> }, // "/home"
      { path: "bmi", element: <BMICalculator /> }, // "/bmi"
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlockedScreen from "../pages/BlockedScreen";

export default function Navbar({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [auth, setAuth] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    setAuth(isAuth);
    if (isAuth) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.fullName) setUserName(storedUser.fullName);
    }
  }, []);

  if (!auth) return <BlockedScreen />;

  const links = [
    { to: "/home", label: "Home" },
    { to: "/bmi", label: "BMI Calculator" },
  ];

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      pathname === path
        ? "bg-white text-gray-900"
        : "text-white hover:bg-gray-700"
    }`;

  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-2">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                closeToast();
                navigate("/login");
              }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false }
    );
  };

  return (
    <div>
      <ToastContainer />
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Brand */}
          <Link to="/home" className="flex items-center space-x-2">
            <img src="logo.webp" alt="icon" className="h-20" />
            <span className="text-xl font-bold">BMI Calculater</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex lg:space-x-6">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Username + Logout on lg+ */}
          <div className="hidden lg:flex items-center space-x-4">
            {userName && (
              <span className="text-sm text-gray-200 font-semibold whitespace-nowrap">
                Hello, {userName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden focus:outline-none"
          >
            {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden bg-gray-900 overflow-hidden transition-max-height duration-300 ${
            menuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass(to)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {userName && (
              <li className="px-4 py-2 text-gray-200 font-semibold">
                Hello, {userName}
              </li>
            )}
            <li className="px-4 py-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Render page content */}
      <div>{children}</div>
    </div>
  );
}

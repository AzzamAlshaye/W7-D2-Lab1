import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";
import BlockedScreen from "../pages/BlockedScreen";

export default function Navbar({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [auth, setAuth] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    setAuth(isAuth);
    if (isAuth) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.fullName) setUserName(storedUser.fullName);
    }
  }, []);

  if (!auth) return <BlockedScreen />;

  const linkClass = (path) =>
    `block px-6 py-3 font-medium rounded-md transition ${
      pathname === path
        ? "bg-white text-gray-900"
        : "text-white hover:bg-gray-700"
    }`;

  return (
    <div>
      <nav className="bg-gray-900 text-white shadow-md relative">
        <div className="container mx-auto flex items-center justify-between lg:justify-normal lg:gap-10 p-4">
          <Link to="/" className="flex items-center space-x-2 justify-center">
            <img src="react-icon.webp" alt="icon" className="h-12" />
            <span className="text-xl font-bold">My Company</span>
          </Link>

          <div className="hidden lg:flex space-x-4 items-center">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link to="/apply" className={linkClass("/apply")}>
              Apply
            </Link>
            <Link to="/applications" className={linkClass("/applications")}>
              My Applications
            </Link>
            {userName && (
              <span className="ml-6 text-sm text-gray-200">
                Hello, {userName}
              </span>
            )}
          </div>

          <button onClick={() => setMenuOpen((o) => !o)} className="lg:hidden">
            {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "max-h-screen" : "max-h-0"
          } lg:hidden bg-gray-900 overflow-hidden transition-max-height duration-300`}
        >
          <ul className="flex flex-col">
            {["/", "/about", "/apply", "/applications"].map((path) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass(path)}
                >
                  {path === "/"
                    ? "Home"
                    : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
            {userName && (
              <li className="px-6 py-3">
                <span className="text-sm text-gray-200">Hello, {userName}</span>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}

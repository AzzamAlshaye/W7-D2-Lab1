// src/components/BlockedScreen.jsx
import React from "react";
import { Link } from "react-router";

export default function BlockedScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-sm sm:max-w-md text-center">
        <img
          src="angry.gif"
          alt="Please log in"
          className="mx-auto w-24 h-24 mb-6 animate-bounce"
        />
        <h2 className="text-white text-3xl font-extrabold mb-2">
          Access Restricted
        </h2>
        <p className="text-gray-300 mb-6">You need to log in to continue.</p>
        <Link
          to="/login"
          className="inline-block bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-lg transition"
          aria-label="Log in to access"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

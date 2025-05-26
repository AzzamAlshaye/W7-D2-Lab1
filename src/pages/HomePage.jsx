// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full text-center p-8 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Welcome to BMI Calculator
        </h1>
        <p className="text-gray-600">
          Easily calculate your Body Mass Index and understand your health
          status.
        </p>
        <Link
          to="/bmi"
          className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-green-700 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}

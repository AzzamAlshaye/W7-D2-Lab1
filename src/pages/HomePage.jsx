// src/pages/HomePage.jsx
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>
        <p className="text-gray-700">
          This is the protected content visible only to logged-in users.
        </p>
        {/* …your actual home page components… */}
      </div>
    </main>
  );
}

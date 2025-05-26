// src/pages/BMICalculator.jsx
import React, { useState } from "react";
import { FaWeight, FaRuler } from "react-icons/fa";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;

    const bmi = w / (h * h);
    let status = "Ideal";

    if (bmi < 18.5) {
      status = "Low";
    } else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
      status = "Obese";
    } else if (bmi >= 35) {
      status = "Extremely Obese";
    }

    const idealWeight = 22.5 * h * h;
    setResult({
      bmi: bmi.toFixed(1),
      status,
      idealWeight: idealWeight.toFixed(1),
    });
  };

  const getImage = () => {
    if (!result) return null;
    switch (result.status) {
      case "Low":
        return "low.png";
      case "Overweight":
        return "overweight.png";
      case "Obese":
        return "obese.png";
      case "Extremely Obese":
        return "extremely-obese.png";
      default: // Ideal
        return "normal.png";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          BMI Calculator
        </h2>

        <form onSubmit={calculate} className="space-y-4">
          <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <FaWeight className="text-green-600 mr-3 text-xl" />
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Weight (kg)"
            />
          </div>

          <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <FaRuler className="text-green-600 mr-3 text-xl" />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Height (cm)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full shadow hover:bg-green-700 transition"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div
            className={
              (result.status === "Low"
                ? "bg-yellow-50 border-yellow-500"
                : result.status === "Ideal"
                ? "bg-green-50 border-green-600"
                : "bg-red-50 border-red-500") +
              " border-l-4 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            }
          >
            <p className="text-lg text-gray-800">
              Ideal Weight:{" "}
              <span className="font-bold">{result.idealWeight} kg</span>
            </p>
            <p className="text-lg text-gray-800">
              Your BMI: <span className="font-bold">{result.bmi}</span> (
              {result.status})
            </p>
            <img
              src={getImage()}
              alt={result.status}
              className="w-32 h-32 mt-2"
            />
          </div>
        )}
      </div>
    </main>
  );
}

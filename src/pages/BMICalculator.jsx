// src/pages/BMICalculator.jsx
import React, { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const h = height / 100;
    const bmi = weight / (h * h);
    let status = "Ideal";
    if (bmi < 18.5) status = "Low";
    else if (bmi >= 25) status = "High";
    const idealWeight = 22.5 * h * h;
    setResult({
      bmi: bmi.toFixed(1),
      status,
      idealWeight: idealWeight.toFixed(1),
    });
  };

  const getImage = () => {
    if (!result) return null;
    if (result.status === "Low") return "/assets/low.png";
    if (result.status === "High") return "/assets/high.png";
    return "/assets/ideal.png";
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">BMI Calculator</h2>
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className="block font-medium">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 text-center">
          <p>
            Ideal Weight:{" "}
            <span className="font-semibold">{result.idealWeight} kg</span>
          </p>
          <p>
            BMI: <span className="font-semibold">{result.bmi}</span> (
            {result.status})
          </p>
          <img
            src={getImage()}
            alt={result.status}
            className="mx-auto mt-4 w-32 h-32"
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// pages/ResultsPage.js
// ============================================

// Importing required modules and components
import React, { useEffect } from "react";
import PredictionResult from "../components/PredictionResult"; // Displays the predicted risk result (with chart and score)
import ComparisonChart from "../components/ComparisonChart";   // Compares user input with healthy baseline values
import FeatureImportance from "../components/FeatureImportance"; // Shows which factors affected the prediction most
import { useNavigate } from "react-router-dom"; // Used for navigation between pages
import { ArrowLeft } from "lucide-react"; // Back arrow icon

// Main ResultsPage component definition
export default function ResultsPage({ prediction, formData, healthyBaseline, featureImportance }) {
  const navigate = useNavigate(); // Initialize navigation hook

  // This effect ensures the page scrolls smoothly to the top every time it loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // Empty dependency array = runs once when component mounts

  return (
    // Main background and layout wrapper
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-8">
      {/* Centers the content and gives spacing between elements */}
      <div className="max-w-5xl mx-auto space-y-10 ml-6">

        {/* ========== Back Button ========== */}
        {/* Allows user to go back to input page */}
        <button
          onClick={() => navigate("/")} // Navigates back to the home/input page
          className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> {/* Small arrow icon */}
          Back to Input
        </button>

        {/* ========== Prediction Summary Card ========== */}
        {/* Only shows if there’s a valid prediction result */}
        {prediction && <PredictionResult prediction={prediction} />}

        {/* ========== Data Visualization Section ========== */}
        {/* Displays comparison chart and feature importance side-by-side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Comparison Chart: compares user’s health values with healthy reference data */}
          {healthyBaseline && (
            <ComparisonChart
              formData={formData}
              healthyBaseline={healthyBaseline}
            />
          )}

          {/* Feature Importance: shows which inputs had most influence on prediction */}
          {featureImportance && (
            <FeatureImportance featureImportance={featureImportance} />
          )}
        </div>
      </div>
    </div>
  );
}

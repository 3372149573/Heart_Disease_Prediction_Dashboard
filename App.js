// App.js

// Importing necessary modules from React and React Router
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing main pages
import InputPage from "./pages/InputPage";   // Page where user enters health data
import ResultsPage from "./pages/ResultsPage"; // Page that displays prediction results and visualizations


// Main Application Component

export default function App() {
  // Base URL for the backend API (Flask server)
  const API_BASE_URL = "http://localhost:5001";

  // State Variables

  // Stores user input data from the form
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  // Holds prediction results returned by the backend
  const [prediction, setPrediction] = useState(null);

  // Indicates whether the app is waiting for a server response
  const [loading, setLoading] = useState(false);

  // Holds the healthy baseline data for comparison charts
  const [healthyBaseline, setHealthyBaseline] = useState(null);

  // Stores the feature importance values that show which factors impact risk most
  const [featureImportance, setFeatureImportance] = useState(null);

 
  // Fetch Data on Initial Load

  // When the component first mounts, fetch baseline and feature data
  useEffect(() => {
    fetchHealthyBaseline();
    fetchFeatureImportance();
  }, []); // Empty array ensures this runs only once


  // Fetch healthy baseline values from backend
 
  const fetchHealthyBaseline = async () => {
    const res = await fetch(`${API_BASE_URL}/api/healthy-baseline`);
    const data = await res.json();
    setHealthyBaseline(data); // Save baseline to state
  };

  
  // Fetch feature importance data from backend
  
  const fetchFeatureImportance = async () => {
    const res = await fetch(`${API_BASE_URL}/api/feature-importance`);
    const data = await res.json();
    setFeatureImportance(data.featureImportance); // Store only the importance list
  };

 
  // Prediction Function
 
  const makePrediction = async () => {
    setLoading(true); // Show loading state
    try {
      // Send a POST request with user input data to the backend
      const res = await fetch(`${API_BASE_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          sex: parseFloat(formData.sex),
          chestPainType: parseFloat(formData.chestPainType),
          exerciseAngina: parseFloat(formData.exerciseAngina),
          oldpeak: parseFloat(formData.oldpeak),
          stSlope: parseFloat(formData.stSlope),
        }),
      });

      // Convert backend response to JSON
      const data = await res.json();

      // Save prediction result for ResultsPage
      setPrediction(data);
      return data;
    } catch (error) {
      // Handles API or connection errors
      console.error("Prediction failed:", error);
      return null;
    } finally {
      // Always stop loading indicator
      setLoading(false);
    }
  };


  // Form Input Change Handler
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data dynamically based on input name
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  // Routing Setup
  
  return (
    <Router>
      <Routes>
        {/* Home route (input form) */}
        <Route
          path="/"
          element={
            <InputPage
              formData={formData}
              handleInputChange={handleInputChange}
              makePrediction={makePrediction}
              loading={loading}
            />
          }
        />

        {/* Results route (after prediction is made) */}
        <Route
          path="/results"
          element={
            <ResultsPage
              prediction={prediction}
              formData={formData}
              healthyBaseline={healthyBaseline}
              featureImportance={featureImportance}
            />
          }
        />
      </Routes>
    </Router>
  );
}

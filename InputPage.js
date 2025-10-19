// ============================================
// pages/InputPage.js
// ============================================

// Importing React and necessary modules
import React from "react";
import InputForm from "../components/InputForm"; // Importing the form component where user inputs data
import { Heart } from "lucide-react"; // Heart icon from lucide-react for visual design
import { useNavigate } from "react-router-dom"; //  Used to programmatically navigate between pages

// Functional React component that displays the main input page
export default function InputPage({ formData, handleInputChange, makePrediction, loading }) {
  const navigate = useNavigate(); // Initialize the navigate function to move to other routes

  // Function that calls the prediction logic and navigates to results page when done
  const handlePrediction = async () => {
    const result = await makePrediction(); // Wait for the prediction process to complete
    if (result) navigate("/results"); // If prediction result is available, go to Results page
  };

  return (
    // Outer container with gradient background and padding
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      
      {/* Main content wrapper with maximum width and centered alignment */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header section with icon and title */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" /> {/* Heart icon for a medical theme */}
          <h1 className="text-3xl font-bold text-gray-800">
            Heart Disease Risk Predictor
          </h1>
        </div>

        {/* The InputForm component handles user input fields */}
        <InputForm
          formData={formData}                 // Current form data state passed from parent
          handleInputChange={handleInputChange} // Function to update form data when user types
          makePrediction={handlePrediction}   // Custom function that triggers prediction and navigation
          loading={loading}                   // Boolean flag to show loading state (e.g., while waiting for API)
        />
      </div>
    </div>
  );
}

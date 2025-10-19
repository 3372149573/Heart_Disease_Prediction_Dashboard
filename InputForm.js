// ============================================
// components/InputForm.js
// ============================================
// This component collects user health data, handles input changes, 
// and triggers the prediction function. It also uses icons and color-coded cards 
// for a friendly, visually engaging UI experience.

import React from "react";
import { Loader, User, Heart, Activity, TrendingUp } from "lucide-react"; // Importing icons for better UI visuals

export default function InputForm({
  formData,            // Object holding all user input data
  handleInputChange,   // Function to update state when input values change
  makePrediction,      // Function that triggers model prediction
  loading,             // Boolean that indicates if prediction is in progress
}) {
  // Define an array of soft pastel colors for each input field container
  // Helps differentiate each section visually and adds a modern UI touch
  const cardColors = [
    "#FFEBEE", // pink for Age
    "#E3F2FD", // light blue for Sex
    "#E8F5E9", // light green for Chest Pain Type
    "#FFFDE7", // soft yellow for Exercise Angina
    "#F3E5F5", // purple for Oldpeak
    "#FFF3E0", // orange for ST Slope
  ];

  return (
    // Outer container that covers full height and provides a gradient background
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #B3E5FC, #D1C4E9)", padding: "2rem" }}>
      
      {/* Center card that contains all form inputs and button */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "2rem", // Smooth rounded corners
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)", // Soft shadow for 3D effect
          padding: "2rem",
        }}
      >
        {/* Header section with a heart icon and title */}
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Heart icon for thematic touch */}
          <Heart
            style={{
              width: "32px",
              height: "32px",
              color: "#F44336",
              marginRight: "0.5rem",
            }}
          />
          Health Risk Dashboard
        </h2>

        {/* Input section container with gap between fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* ================= AGE INPUT ================= */}
          {/* Collects user’s age in years */}
          <div
            style={{
              background: cardColors[0],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              {/* User icon beside label */}
              <User
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#2196F3",
                  marginRight: "0.5rem",
                }}
              />{" "}
              Age (years)
            </label>

            {/* Input box for numerical age entry */}
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange} // Triggers handler when user types
              placeholder="e.g., 45"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* ================= SEX SELECTION ================= */}
          {/* Allows user to select their biological sex */}
          <div
            style={{
              background: cardColors[1],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              <User
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#E91E63",
                  marginRight: "0.5rem",
                }}
              />{" "}
              Sex
            </label>

            {/* Dropdown for selecting sex */}
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select...</option>
              <option value="0">Female (0)</option>
              <option value="1">Male (1)</option>
            </select>
          </div>

          {/* ================= CHEST PAIN TYPE ================= */}
          {/* Describes the type of chest pain experienced */}
          <div
            style={{
              background: cardColors[2],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              <Activity
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#F44336",
                  marginRight: "0.5rem",
                }}
              />{" "}
              Chest Pain Type
            </label>

            {/* Dropdown to select pain category */}
            <select
              name="chestPainType"
              value={formData.chestPainType}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select...</option>
              <option value="0">Typical Angina (0)</option>
              <option value="1">Atypical Angina (1)</option>
              <option value="2">Non-anginal Pain (2)</option>
              <option value="3">Asymptomatic (3)</option>
            </select>
          </div>

          {/* ================= EXERCISE INDUCED ANGINA ================= */}
          {/* Checks if angina symptoms appear during exercise */}
          <div
            style={{
              background: cardColors[3],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              <Activity
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#4CAF50",
                  marginRight: "0.5rem",
                }}
              />{" "}
              Exercise Induced Angina
            </label>

            {/* Dropdown with yes/no options */}
            <select
              name="exerciseAngina"
              value={formData.exerciseAngina}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select...</option>
              <option value="0">No (0)</option>
              <option value="1">Yes (1)</option>
            </select>
          </div>

          {/* ================= OLDPEAK INPUT ================= */}
          {/* Represents ST depression induced by exercise relative to rest */}
          <div
            style={{
              background: cardColors[4],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              <TrendingUp
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#FFC107",
                  marginRight: "0.5rem",
                }}
              />{" "}
              Oldpeak (ST depression)
            </label>

            {/* Numeric input that accepts decimals */}
            <input
              type="number"
              name="oldpeak"
              value={formData.oldpeak}
              onChange={handleInputChange}
              placeholder="e.g., 1.5"
              step="0.1" // Allows fractional input
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* ================= ST SLOPE SELECTION ================= */}
          {/* Represents the slope of the peak exercise ST segment */}
          <div
            style={{
              background: cardColors[5],
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              <Activity
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#9C27B0",
                  marginRight: "0.5rem",
                }}
              />{" "}
              ST Slope
            </label>

            {/* Dropdown to select ST segment slope type */}
            <select
              name="stSlope"
              value={formData.stSlope}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select...</option>
              <option value="0">Upsloping (0)</option>
              <option value="1">Flat (1)</option>
              <option value="2">Downsloping (2)</option>
            </select>
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          {/* Button that triggers prediction using collected input data */}
          <button
            onClick={makePrediction} // Runs prediction function on click
            disabled={loading} // Prevents multiple clicks during loading
            style={{
              width: "100%",
              background: "linear-gradient(to right, #2196F3, #9C27B0)",
              color: "#fff",
              fontWeight: "bold",
              padding: "0.75rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              cursor: loading ? "not-allowed" : "pointer", // Changes cursor during loading
              opacity: loading ? 0.6 : 1, // Adds transparency if loading
            }}
          >
            {/* Dynamic content based on loading state */}
            {loading ? (
              <>
                {/* Shows spinner animation during prediction */}
                <Loader
                  style={{ width: "20px", height: "20px" }}
                  className="animate-spin"
                />
                Predicting...
              </>
            ) : (
              <>
                {/* Default button content */}
                <Activity style={{ width: "20px", height: "20px" }} /> Predict Risk
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

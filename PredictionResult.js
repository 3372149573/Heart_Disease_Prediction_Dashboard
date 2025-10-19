// ============================================
// components/PredictionResult.js
// ============================================

// Importing necessary libraries and components
import React from 'react';
import { AlertCircle } from 'lucide-react'; // Icon (not used currently, but can be for warning)
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Chart library for data visualization

// Functional React component that displays the prediction result
export default function PredictionResult({ prediction }) {

  // Function to determine background color and border color based on risk level
  const getRiskColor = (level) => {
    switch(level) {
      case 'High': 
        return 'bg-red-100 border-red-500 text-red-800'; // Red shades for high risk
      case 'Moderate': 
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'; // Yellow for moderate risk
      case 'Low': 
        return 'bg-green-100 border-green-500 text-green-800'; // Green for low risk
      default: 
        return 'bg-gray-100'; // Default color if no valid risk level is provided
    }
  };

  // Prepare data for the Pie Chart visualization
  // It shows two slices: 'Risk' and 'No Risk', based on the user's riskScore percentage
  const pieData = [
    { name: 'Risk', value: prediction.riskScore },            // Actual predicted risk percentage
    { name: 'No Risk', value: 100 - prediction.riskScore }    // Remaining percentage up to 100%
  ];

  // Define color palette for the Pie Chart slices
  const COLORS = ['#ef4444', '#10b981']; // Red for risk, green for no risk

  return (
    // Main container with dynamic background color depending on the risk level
    <div className={`rounded-lg shadow-lg p-6 border-l-4 ${getRiskColor(prediction.riskLevel)}`}>

      {/* Header section (currently showing only title) */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm opacity-75">Based on your health data</h3>
        </div>
      </div>
      
      {/* Pie Chart visualization section */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow">
        {/* ResponsiveContainer makes chart automatically resize based on parent width */}
        <ResponsiveContainer width="35%" height={250}>
          <PieChart>
            {/* Pie component defines chart type, layout, and labels */}
            <Pie
              data={pieData}             // Data array for chart
              dataKey="value"            // Value field from data
              nameKey="name"             // Label field from data
              cx="50%"                   // Center X position
              cy="50%"                   // Center Y position
              outerRadius={80}           // Radius of the pie
              // Label displays name and percentage for each section
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {/* Loop through pieData to assign colors for each slice */}
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} // Alternate colors from COLORS array
                />
              ))}
            </Pie>
            {/* Tooltip shows info on hover */}
            <Tooltip />
            {/* Legend displays names and colors for chart parts */}
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Section title for better layout clarity */}
      <h4 className="text-lg font-bold mb-2 text-gray-700">Risk Visualization</h4>

      {/* Grid displaying numerical details of prediction */}
      <div className="grid grid-cols-2 gap-4 mt-4">

        {/* Box showing risk level (High, Moderate, Low) */}
        <div className="bg-white bg-opacity-50 p-4 rounded">
          <p className="text-sm font-medium opacity-75">
            Risk Level: {prediction.riskLevel}
          </p>
        </div>

        {/* Box showing risk score percentage */}
        <div className="bg-white bg-opacity-50 p-4 rounded">
          <p className="text-sm font-medium opacity-75">
            Risk Score: {prediction.riskScore}%
          </p>
        </div>

      </div>
    </div>
  );
}
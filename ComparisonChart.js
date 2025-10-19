// ============================================
// components/ComparisonChart.js
// ============================================

// Importing React library
import React from 'react';

// Importing chart components from Recharts
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// Importing an icon from lucide-react for styling the title
import { TrendingUp } from 'lucide-react';

// Exporting the ComparisonChart component
export default function ComparisonChart({ formData, healthyBaseline }) {

  // Creating an array of objects to hold data for the chart
  // Each object represents a category comparing user data and healthy baseline
  const comparisonData = [
    { 
      name: 'Chest Pain', // X-axis label
      'Your Data': parseFloat(formData.chestPainType) || 0, // Converts user input to number, defaults to 0 if invalid
      'Healthy Baseline': healthyBaseline.chestPainType // Baseline reference value
    },
    { 
      name: 'Exercise Angina', 
      'Your Data': parseFloat(formData.exerciseAngina) || 0, 
      'Healthy Baseline': healthyBaseline.exerciseAngina 
    },
    { 
      name: 'Oldpeak', 
      'Your Data': parseFloat(formData.oldpeak) || 0, 
      'Healthy Baseline': healthyBaseline.oldpeak 
    },
    { 
      name: 'ST Slope', 
      'Your Data': parseFloat(formData.stSlope) || 0, 
      'Healthy Baseline': healthyBaseline.stSlope 
    },
  ];

  return (
    // Main container box with Tailwind CSS styling
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto"> {/* limit width */}
      
      {/* Chart heading with icon */}
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> {/* Trending up icon */}
        Your Data vs Healthy Baseline {/* Chart title */}
      </h3>

      {/* Responsive container makes the chart adjust to screen size */}
      <ResponsiveContainer width="65%" height={280}>
        {/* BarChart component for rendering the chart */}
        <BarChart
          data={comparisonData} // Data source for the chart
          barCategoryGap="35%" // Space between category groups
          barGap={2} // Space between bars in the same group
          margin={{ top: 10, right: 30, left: 10, bottom: 50 }} // Chart padding
        >
          <CartesianGrid strokeDasharray="3 3" /> {/* Adds grid lines in background */}

          {/* X-axis configuration */}
          <XAxis 
            dataKey="name" // Uses 'name' property for X-axis labels
            height={40} // Height for X-axis area
            style={{ fontWeight: 'bold', fontSize: 14 }} // Label style
          />

          {/* Y-axis configuration */}
          <YAxis style={{ fontWeight: 'bold', fontSize: 14 }} /> {/* Numeric scale */}

          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} /> {/* Shows data info on hover */}
          <Legend /> {/* Displays color key for each bar type */}

          {/* Bar for user's data */}
          <Bar 
            dataKey="Your Data" // Uses 'Your Data' field from dataset
            fill="#ef4444" // Red color (Tailwind red-500)
            radius={[3, 3, 0, 0]} // Rounded top corners
            barSize={75} // Bar width
          />

          {/* Bar for healthy baseline data */}
          <Bar 
            dataKey="Healthy Baseline" // Uses 'Healthy Baseline' field from dataset
            fill="#10b981" // Green color (Tailwind green-500)
            radius={[3, 3, 0, 0]} // Rounded top corners
            barSize={75} // Bar width
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

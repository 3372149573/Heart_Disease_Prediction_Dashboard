// ============================================
// components/FeatureImportance.js
// ============================================

// Importing React library
import React from 'react';

// Importing specific components from Recharts for building the bar chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Importing a heart icon from lucide-react for the title decoration
import { Heart } from 'lucide-react';

// Exporting the FeatureImportance functional component
export default function FeatureImportance({ featureImportance }) {
  return (
    // Outer container for the chart with Tailwind CSS styling
    <div className="bg-white rounded-lg shadow-lg p-6">
      
      {/* Chart heading with icon and title */}
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-red-500" /> {/* Red heart icon */}
        Most Affecting Factors (Feature Importance) {/* Title text */}
      </h3>

      {/* Responsive container ensures chart fits dynamically within parent */}
      <ResponsiveContainer width="65%" height={300}>
        {/* Vertical Bar Chart to display feature importance data */}
        <BarChart
          data={featureImportance} // Data passed in through props
          layout="vertical" // Makes the bars horizontal (Y-axis = categories)
        >
          <CartesianGrid strokeDasharray="3 3" /> {/* Adds dashed background grid lines */}

          {/* X-axis configuration (numerical axis for importance values) */}
          <XAxis 
            type="number" // Horizontal axis shows numerical values
            style={{ fontWeight: 'bold', fontSize: 14 }} // Axis label styling
          />

          {/* Y-axis configuration (categorical axis for feature names) */}
          <YAxis 
            dataKey="name" // Uses the 'name' field for category labels
            type="category" // Vertical axis shows text categories
            width={140} // Adjust width to fit feature names
            style={{ fontWeight: 'bold', fontSize: 14 }} // Label styling
          />

          <Tooltip /> {/* Displays data details when hovering over bars */}

          {/* Bar component for displaying importance values */}
          <Bar 
            dataKey="importance" // Uses 'importance' key from dataset
            fill="#f59e0b" // Orange color for bars (Tailwind amber-500)
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

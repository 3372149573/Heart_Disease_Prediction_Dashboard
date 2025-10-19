# ============================================
# backend/app.py
# ============================================
# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS  # Allows communication between Flask (backend) and React (frontend)
import joblib  # For loading trained ML model
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler  # (Optional) used if you need data normalization later

# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing to allow frontend requests
CORS(app)


#  Load the trained ML model

gb_model = joblib.load('model.pkl')  # Pre-trained gradient boosting model


#  Load baseline (healthy) average data

with open('healthy_avg.json', 'r') as f:
    healthy_data = json.load(f)
    # The file might contain a list or dict — handle both cases safely
    if isinstance(healthy_data, list):
        healthy_avg = pd.Series(healthy_data[0])
    else:
        healthy_avg = pd.Series(healthy_data)

#  Extract and store feature importance

feature_importance = gb_model.feature_importances_
feature_names = ['age', 'sex', 'chest pain type', 'exercise angina', 'oldpeak', 'ST slope']
# Convert importance values to percentages for easier visualization
importance_dict = dict(zip(feature_names, feature_importance * 100))


# PREDICTION ENDPOINT — Handles POST requests from frontend

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Receives user input from frontend and returns heart disease prediction.
    Input fields: age, sex, chestPainType, exerciseAngina, oldpeak, stSlope
    """
    try:
        # Parse JSON input from frontend
        data = request.get_json()
        
        # Extract and convert inputs to float
        age = float(data.get('age'))
        sex = float(data.get('sex'))
        chest_pain_type = float(data.get('chestPainType'))
        exercise_angina = float(data.get('exerciseAngina'))
        oldpeak = float(data.get('oldpeak'))
        st_slope = float(data.get('stSlope'))
        
        # Create a feature array in the same order used during model training
        features = np.array([[age, sex, chest_pain_type, exercise_angina, oldpeak, st_slope]])
        
        # Make prediction using the loaded model
        prediction = gb_model.predict(features)[0]  # 0 = Healthy, 1 = Diseased
        prediction_proba = gb_model.predict_proba(features)[0]  # [healthy_prob, disease_prob]
        
        # Compute risk score (percentage probability of heart disease)
        risk_score = prediction_proba[1] * 100
        
        # Assign a readable risk level based on score
        if risk_score >= 70:
            risk_level = 'High'
        elif risk_score >= 40:
            risk_level = 'Moderate'
        else:
            risk_level = 'Low'
        
        # Prepare final response with all details
        response = {
            'prediction': int(prediction),  # Convert numpy int to normal int
            'riskScore': round(risk_score, 2),
            'riskLevel': risk_level,
            'probability': round(prediction_proba[1], 3),
            'healthyProbability': round(prediction_proba[0], 3)
        }
        
        # Return success response with HTTP 200
        return jsonify(response), 200
    
    except Exception as e:
        # Handle errors (e.g., missing data or invalid type)
        return jsonify({'error': str(e)}), 400

#  FEATURE IMPORTANCE ENDPOINT

@app.route('/api/feature-importance', methods=['GET'])
def get_feature_importance():
    """
    Returns list of features and their importance scores.
    Useful for visualizing which factors influence the prediction most.
    """
    try:
        # Sort by importance (highest to lowest)
        importance_list = [
            {'name': name, 'importance': round(importance, 2)}
            for name, importance in sorted(importance_dict.items(), key=lambda x: x[1], reverse=True)
        ]
        return jsonify({'featureImportance': importance_list}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


#  HEALTHY BASELINE ENDPOINT

@app.route('/api/healthy-baseline', methods=['GET'])
def get_healthy_baseline():
    """
    Returns the average healthy reference values.
    The frontend can use this data for comparison (e.g., charts or benchmarks).
    """
    try:
        baseline = {
            'age': round(float(healthy_avg.get('age', 0)), 2),
            'sex': round(float(healthy_avg.get('sex', 0)), 2),
            'chestPainType': round(float(healthy_avg.get('chest pain type', 0)), 2),
            'exerciseAngina': round(float(healthy_avg.get('exercise angina', 0)), 2),
            'oldpeak': round(float(healthy_avg.get('oldpeak', 0)), 2),
            'stSlope': round(float(healthy_avg.get('ST slope', 0)), 2)
        }
        return jsonify(baseline), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


#  HEALTH CHECK ENDPOINT

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Simple API status check endpoint.
    Confirms that the server and model are both active.
    """
    return jsonify({'status': 'API is running', 'model_loaded': True}), 200


if __name__ == '__main__':
    # Run the Flask app in debug mode for local development
    app.run(debug=True, host='0.0.0.0', port=5001)

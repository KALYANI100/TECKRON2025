from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("pricing_model.pkl")

# Function to preprocess input data before feeding into ML model
def preprocess_input(data):
    # Convert categorical values to numerical format (ensure same encoding as training)
    encoding_maps = {
        "Demand_Level": {"Low": 0, "Medium": 1, "High": 2},
        "Traffic_Congestion": {"Light": 0, "Moderate": 1, "Heavy": 2},
        "Urgency_Level": {"Low": 0, "Medium": 1, "High": 2},
        "Driver_Availability": {"Low": 0, "Medium": 1, "High": 2},
        "Weather_Impact": {"Clear": 0, "Rainy": 1, "Stormy": 2},
        "Special_Event": {"None": 0, "Concert": 1, "Sports Event": 2, "Holiday": 3}
    }

    # Convert categorical values to numeric using the encoding maps
    processed_data = [
        encoding_maps["Demand_Level"].get(data["Demand_Level"], 1),
        encoding_maps["Traffic_Congestion"].get(data["Traffic_Congestion"], 1),
        encoding_maps["Urgency_Level"].get(data["Urgency_Level"], 1),
        encoding_maps["Driver_Availability"].get(data["Driver_Availability"], 1),
        float(data["Distance_km"]),
        float(data["Base_Price"]),
        encoding_maps["Weather_Impact"].get(data["Weather_Impact"], 0),
        encoding_maps["Special_Event"].get(data["Special_Event"], 0)
    ]

    return np.array([processed_data])  # Return as a 2D array for ML model


@app.route('/predict_price', methods=['POST'])
def predict_price_api():
    try:
        # Get JSON data from frontend
        data = request.json  

        # Preprocess input data
        processed_data = preprocess_input(data)

        # Predict price using ML model
        predicted_price = model.predict(processed_data)[0]

        return jsonify({"Final_Price": round(predicted_price, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)

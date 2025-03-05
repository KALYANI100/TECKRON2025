from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model and encoders
model = joblib.load("pricing_model.pkl")
encoders = joblib.load("encoders.pkl")

# Load dataset structure for reference
df = pd.read_csv("pricing_data.csv")

@app.route('/predict_price', methods=['POST'])
def predict_price_api():
    try:
        data = request.json  

        if "Order_ID" not in data:
            return jsonify({"error": "Missing parameter: Order_ID"}), 400
        
        order_id = data["Order_ID"]  

        required_params = [
            "Time_of_Order", "Demand_Level", "Traffic_Congestion", "Urgency_Level",
            "Driver_Availability", "Distance_km", "Competitor_Price", "Weather_Impact",
            "Special_Event", "Customer_Loyalty", "Stock_Availability", "Delivery_Charges",
            "Expiry_Days"
        ]

        missing_params = [param for param in required_params if param not in data]
        if missing_params:
            return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400

        # Convert Time_of_Order to total minutes
        data["Time_of_Order"] = pd.to_datetime(data["Time_of_Order"], format="%H:%M").hour * 60 + \
                                pd.to_datetime(data["Time_of_Order"], format="%H:%M").minute

        # Encode categorical variables safely
        categorical_features = ["Demand_Level", "Traffic_Congestion", "Urgency_Level",
                                "Driver_Availability", "Weather_Impact", "Special_Event",
                                "Stock_Availability"]

        for col in categorical_features:
            if col in encoders:  
                if data[col] in encoders[col].classes_:
                    data[col] = encoders[col].transform([data[col]])[0]
                else:
                    data[col] = -1  # Assign unknown values to -1

        # Convert input data to DataFrame
        input_data = pd.DataFrame([data], columns=required_params)

        # Predict price
        predicted_price = model.predict(input_data)[0]

        return jsonify({
            "Order_ID": order_id,
            "Predicted_Price": float(predicted_price)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

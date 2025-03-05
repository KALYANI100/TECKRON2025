from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model (pipeline already includes encoding + scaling)
model = joblib.load("pricing_model.pkl")

# API endpoint for price prediction
@app.route('/predict_price', methods=['POST'])
def predict_price_api():
    try:
        # Get JSON data from request
        data = request.json  

        # Convert input to DataFrame (WITHOUT manual encoding)
        input_data = pd.DataFrame([data])

        # Predict price using ML model
        predicted_price = model.predict(input_data)[0]

        # Convert numpy.float32 to a Python float before returning
        return jsonify({"Final_Price": float(predicted_price)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

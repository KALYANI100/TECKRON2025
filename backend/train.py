import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb


# 🔹 Load Dataset (Ensure this dataset is available)
df = pd.read_csv("Delivery_Pricing_Data.csv")  # Adjust path if needed

# 🔹 Handle Missing Values
numerical_features = ['Distance_km', 'Base_Price']
categorical_features = ['Demand_Level', 'Traffic_Congestion', 'Urgency_Level', 
                        'Driver_Availability', 'Weather_Impact', 'Special_Event']

df[numerical_features] = df[numerical_features].fillna(df[numerical_features].median())
df[categorical_features] = df[categorical_features].fillna(df[categorical_features].mode().iloc[0])

# 🔹 Define Features (X) and Target Variable (y)
X = df.drop(columns=['Order_ID', 'Date_Time', 'Final_Price'])  # Adjust columns if needed
y = df['Final_Price']

# 🔹 Preprocessing: Encoding Categorical & Scaling Numerical Data
preprocessor = ColumnTransformer([
    ("num", StandardScaler(), numerical_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
])

# 🔹 Split Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🔹 Train XGBoost Model Pipeline
xgb_model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", xgb_model)
])

# 🔹 Train Model
pipeline.fit(X_train, y_train)

# 🔹 Save Model for Flask API
joblib.dump(pipeline, "pricing_model.pkl")


# ===================== 🔥 Function for Predictions 🔥 =====================
def predict_price(data):
    """
    Predicts the final price based on input parameters.

    :param data: Dictionary containing feature values
    :return: Predicted final price
    """

    try:
        # Load the trained model
        model = joblib.load("pricing_model.pkl")

        # Convert input into a DataFrame
        input_data = pd.DataFrame([data])

        # Predict price using model
        predicted_price = model.predict(input_data)[0]

        return round(predicted_price, 2)  # Return rounded value

    except Exception as e:
        return f"Error: {str(e)}"

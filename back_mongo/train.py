import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("pricing_data.csv")

# Convert Time_of_Order (HH:MM) to total minutes since midnight
df["Time_of_Order"] = pd.to_datetime(df["Time_of_Order"], format="%H:%M").dt.hour * 60 + pd.to_datetime(df["Time_of_Order"], format="%H:%M").dt.minute

# Define selected features for training (excluding target variables)
features = [
    "Time_of_Order", "Demand_Level", "Traffic_Congestion", "Urgency_Level",
    "Driver_Availability", "Distance_km", "Competitor_Price", "Weather_Impact",
    "Special_Event", "Customer_Loyalty", "Stock_Availability", "Delivery_Charges",
    "Expiry_Days"
]

target = "Final_Price"  # Prediction target

# Encode categorical features
encoders = {}
categorical_features = ["Demand_Level", "Traffic_Congestion", "Urgency_Level", "Driver_Availability", "Weather_Impact", "Special_Event", "Stock_Availability"]

for col in categorical_features:
    encoders[col] = LabelEncoder()
    df[col] = encoders[col].fit_transform(df[col].astype(str))  # Ensure string type before encoding

# Fill missing values only in **numeric** columns
numeric_features = [col for col in features if col not in categorical_features]
df[numeric_features] = df[numeric_features].fillna(df[numeric_features].median())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(df[features], df[target], test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model and encoders
joblib.dump(model, "pricing_model.pkl")
joblib.dump(encoders, "encoders.pkl")

print(" Model trained successfully!")

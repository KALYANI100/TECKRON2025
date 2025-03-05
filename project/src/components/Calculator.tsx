import React, { useState } from "react";

export const Calculator = () => {
  const [deliveryFactors, setDeliveryFactors] = useState({
    orderId: "",
    timeOfOrder: "",
    demandLevel: "",
    trafficCongestion: "",
    urgencyLevel: "",
    driverAvailability: "",
    distanceKm: 0,
    competitorPrice: 0,
    weatherImpact: "",
    specialEvent: "",
    customerLoyalty: "",
    stockAvailability: "",
    expiryDays: 0,
  });

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  // Mapping delivery factors to required params for the request
  const sendToBackend = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission (page refresh)
    
    // Filter out empty values before sending the data
    const requestData = {
      Order_ID: deliveryFactors.orderId || "",
      Time_of_Order: deliveryFactors.timeOfOrder || "",
      Demand_Level: deliveryFactors.demandLevel || null,
      Traffic_Congestion: deliveryFactors.trafficCongestion || null,
      Urgency_Level: deliveryFactors.urgencyLevel || null,
      Driver_Availability: deliveryFactors.driverAvailability || null,
      Distance_km: deliveryFactors.distanceKm || 0,
      Competitor_Price: deliveryFactors.competitorPrice || 0,
      Weather_Impact: deliveryFactors.weatherImpact || null,
      Special_Event: deliveryFactors.specialEvent || null,
      Customer_Loyalty: deliveryFactors.customerLoyalty || null,
      Stock_Availability: deliveryFactors.stockAvailability || null,
      Expiry_Days: deliveryFactors.expiryDays || 0,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/predict_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Price calculated:", result);
        setPredictedPrice(result.Predicted_Price); // Assuming the backend returns price
      } else {
        console.error("Error sending data to backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryFactors((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Delivery Price Calculator</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={sendToBackend}>
        {/* Order ID */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium"># Order ID</label>
          <input
            type="text"
            name="orderId"
            value={deliveryFactors.orderId || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white focus:ring focus:ring-blue-400"
          />
        </div>
        
        {/* Time of Order */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">⏰ Place Order</label>
          <input
            type="time"
            name="timeOfOrder"
            value={deliveryFactors.timeOfOrder || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Demand Level */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">👤 Demand Level</label>
          <select
            name="demandLevel"
            value={deliveryFactors.demandLevel || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Traffic Congestion */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">🚗 Traffic Congestion</label>
          <select
            name="trafficCongestion"
            value={deliveryFactors.trafficCongestion || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>Light</option>
            <option>Moderate</option>
            <option>Heavy</option>
          </select>
        </div>

        {/* Urgency Level */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">🚨 Urgency Level</label>
          <select
            name="urgencyLevel"
            value={deliveryFactors.urgencyLevel || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Driver Availability */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">👥 Driver Availability</label>
          <select
            name="driverAvailability"
            value={deliveryFactors.driverAvailability || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Distance (km) */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">📏 Distance (km)</label>
          <input
            type="number"
            name="distanceKm"
            value={deliveryFactors.distanceKm || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          />
        </div>

        {/* Competitor Price */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">💰 Competitor Price</label>
          <input
            type="number"
            name="competitorPrice"
            value={deliveryFactors.competitorPrice || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          />
        </div>

        {/* Weather Impact */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">🌦 Weather Impact</label>
          <select
            name="weatherImpact"
            value={deliveryFactors.weatherImpact || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>Clear</option>
            <option>Stormy</option>
            <option>Rainy</option>
            <option>Snowy</option>
          </select>
        </div>

        {/* Special Event */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">📅 Special Event</label>
          <select
            name="specialEvent"
            value={deliveryFactors.specialEvent || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>None</option>
            <option>Sports Event</option>
            <option>Holiday</option>
          </select>
        </div>

        {/* Customer Loyalty */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">🏅 Customer Loyalty</label>
          <select
            name="customerLoyalty"
            value={deliveryFactors.customerLoyalty || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Stock Availability */}
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">📦 Stock Availability</label>
          <select
            name="stockAvailability"
            value={deliveryFactors.stockAvailability || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
            <option>Low Stock</option>
          </select>
        </div>

        {/* Expiry Days */}
        <div className="flex flex-col col-span-2">
          <label className="text-gray-300 font-medium">📅 Expiry Days</label>
          <input
            type="number"
            name="expiryDays"
            value={deliveryFactors.expiryDays || ""}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 rounded-md p-2 text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Calculate Price
        </button>
      </form>

      {/* Display Predicted Price */}
      {predictedPrice !== null && (
        <div className="mt-6 bg-gray-800 p-4 rounded-md text-center">
          <h2 className="text-lg font-semibold text-gray-300">
            Predicted Price: <span className="text-blue-400">₹{predictedPrice}</span>
          </h2>
        </div>
      )}
    </div>
  );
};

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
  const sendToBackend = async () => {
    const requestData = {
      Order_ID: deliveryFactors.orderId || "",
      Time_of_Order: deliveryFactors.timeOfOrder || "",
      Demand_Level: deliveryFactors.demandLevel || "",
      Traffic_Congestion: deliveryFactors.trafficCongestion || "",
      Urgency_Level: deliveryFactors.urgencyLevel || "",
      Driver_Availability: deliveryFactors.driverAvailability || "",
      Distance_km: deliveryFactors.distanceKm || 0,
      Competitor_Price: deliveryFactors.competitorPrice || 0,
      Weather_Impact: deliveryFactors.weatherImpact || "",
      Special_Event: deliveryFactors.specialEvent || "",
      Customer_Loyalty: deliveryFactors.customerLoyalty || "",
      Stock_Availability: deliveryFactors.stockAvailability || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryFactors((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="calculator-container">
      <h1>Pricing Calculator</h1>
      <form className="form-container">
        <div className="form-group">
          <label>Order ID</label>
          <input
            type="text"
            name="orderId"
            value={deliveryFactors.orderId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Time of Order</label>
          <input
            type="text"
            name="timeOfOrder"
            value={deliveryFactors.timeOfOrder}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Demand Level</label>
          <input
            type="text"
            name="demandLevel"
            value={deliveryFactors.demandLevel}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Traffic Congestion</label>
          <input
            type="text"
            name="trafficCongestion"
            value={deliveryFactors.trafficCongestion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <input
            type="text"
            name="urgencyLevel"
            value={deliveryFactors.urgencyLevel}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Driver Availability</label>
          <input
            type="text"
            name="driverAvailability"
            value={deliveryFactors.driverAvailability}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Distance (km)</label>
          <input
            type="number"
            name="distanceKm"
            value={deliveryFactors.distanceKm}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Competitor Price</label>
          <input
            type="number"
            name="competitorPrice"
            value={deliveryFactors.competitorPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Weather Impact</label>
          <input
            type="text"
            name="weatherImpact"
            value={deliveryFactors.weatherImpact}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Special Event</label>
          <input
            type="text"
            name="specialEvent"
            value={deliveryFactors.specialEvent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Customer Loyalty</label>
          <input
            type="text"
            name="customerLoyalty"
            value={deliveryFactors.customerLoyalty}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Stock Availability</label>
          <input
            type="text"
            name="stockAvailability"
            value={deliveryFactors.stockAvailability}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Expiry Days</label>
          <input
            type="number"
            name="expiryDays"
            value={deliveryFactors.expiryDays}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="bg-black text-white" onClick={sendToBackend}>
          Calculate Price
        </button>
      </form>

      {predictedPrice !== null && (
        <div>
          <h2 className="text-black">Predicted Price: ₹{predictedPrice}</h2>
        </div>
      )}
    </div>
  );
};



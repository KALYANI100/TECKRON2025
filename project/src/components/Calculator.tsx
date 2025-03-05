"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Zap,
  DollarSign,
  Users,
  Car,
  Cloud,
  Calendar,
  Hash,
  Package,
  Truck,
} from "lucide-react";
import { usePricingStore } from "../lib/store";
import { pricingModel } from "../lib/ml/pricingModel";

interface CalculatorProps {
  isDark: boolean;
}

export function Calculator({ isDark }: CalculatorProps) {
  const { deliveryFactors, setDeliveryFactors } = usePricingStore();
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const demandLevels = ["Low", "Medium", "High"];
  const trafficCongestion = ["Light", "Moderate", "Heavy"];
  const urgencyLevels = ["Flexible", "Standard", "Urgent"];
  const driverAvailability = ["Low", "Medium", "High"];
  const weatherImpact = ["Clear", "Rainy", "Snowy", "Stormy"];
  const specialEvents = ["None", "Holiday", "Concert", "Festival"];
  const customerLoyalty = ["Low", "Medium", "High"];
  const timeOfOrder = ["Morning", "Afternoon", "Night"];
  const stockAvailability = ["Low", "Medium", "High"];

  useEffect(() => {
    const calculatePrice = async () => {
      const price = await pricingModel.predict(deliveryFactors);
      setPredictedPrice(price);
    };
    calculatePrice();
  }, [deliveryFactors]);

  return (
    <div
      className={`${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      <h2
        className={`text-xl font-bold mb-6 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Delivery Price Calculator
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Order ID
              </span>
            </label>
            <input
              type="text"
              value={deliveryFactors.orderId || ""}
              onChange={(e) => setDeliveryFactors({ orderId: e.target.value })}
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="ORD12345"
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time of Order
              </span>
            </label>
            <select
              value={deliveryFactors.timeOfOrder || timeOfOrder[0]}
              onChange={(e) =>
                setDeliveryFactors({ timeOfOrder: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {timeOfOrder.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Demand Level
              </span>
            </label>
            <select
              value={deliveryFactors.demandLevel || demandLevels[0]}
              onChange={(e) =>
                setDeliveryFactors({ demandLevel: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {demandLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Traffic Congestion
              </span>
            </label>
            <select
              value={deliveryFactors.trafficCongestion || trafficCongestion[0]}
              onChange={(e) =>
                setDeliveryFactors({ trafficCongestion: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {trafficCongestion.map((congestion) => (
                <option key={congestion} value={congestion}>
                  {congestion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Urgency Level
              </span>
            </label>
            <select
              value={deliveryFactors.urgencyLevel || urgencyLevels[0]}
              onChange={(e) =>
                setDeliveryFactors({ urgencyLevel: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Driver Availability
              </span>
            </label>
            <select
              value={
                deliveryFactors.driverAvailability || driverAvailability[0]
              }
              onChange={(e) =>
                setDeliveryFactors({ driverAvailability: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {driverAvailability.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Distance (km)
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={deliveryFactors.distanceKm}
              onChange={(e) =>
                setDeliveryFactors({
                  distanceKm: Number.parseFloat(e.target.value),
                })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Competitor Price
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={deliveryFactors.competitorPrice}
              onChange={(e) =>
                setDeliveryFactors({
                  competitorPrice: Number.parseFloat(e.target.value),
                })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Weather Impact
              </span>
            </label>
            <select
              value={deliveryFactors.weatherImpact || weatherImpact[0]}
              onChange={(e) =>
                setDeliveryFactors({ weatherImpact: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {weatherImpact.map((impact) => (
                <option key={impact} value={impact}>
                  {impact}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Special Event
              </span>
            </label>
            <select
              value={deliveryFactors.specialEvent || specialEvents[0]}
              onChange={(e) =>
                setDeliveryFactors({ specialEvent: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {specialEvents.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Customer Loyalty
              </span>
            </label>
            <select
              value={deliveryFactors.customerLoyalty || customerLoyalty[0]}
              onChange={(e) =>
                setDeliveryFactors({ customerLoyalty: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {customerLoyalty.map((loyalty) => (
                <option key={loyalty} value={loyalty}>
                  {loyalty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Stock Availability
              </span>
            </label>
            <select
              value={deliveryFactors.stockAvailability || stockAvailability[0]}
              onChange={(e) =>
                setDeliveryFactors({ stockAvailability: e.target.value })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              {stockAvailability.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Expiry Days
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={deliveryFactors.expiryDays}
              onChange={(e) =>
                setDeliveryFactors({
                  expiryDays: Number.parseInt(e.target.value),
                })
              }
              className={`block w-full rounded-md ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Calculate Price
        </button>

        <div
          className={`mt-6 p-4 rounded-lg ${
            isDark ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Predicted Price:
              </span>
              <span className="text-lg font-bold text-blue-600">
                ${predictedPrice ? predictedPrice.toFixed(2) : "..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

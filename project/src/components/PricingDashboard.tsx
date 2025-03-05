import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, MapPin, AlertTriangle } from 'lucide-react';
//import { usePricingStore } from '../lib/store';

interface PriceDataPoint {
  time: string;
  price: number;
  predicted: number;
  orderId: string;
}

interface PricingDashboardProps {
  isDark: boolean;
  PriceData: PriceDataPoint | null;
}

export function PricingDashboard({ isDark, PriceData }: PricingDashboardProps) {
  const [deliveryData, setDeliveryData] = useState<PriceDataPoint[]>([]);

  useEffect(() => {
    if (PriceData) {
      setDeliveryData(prevData => {
        const newData = [...prevData, PriceData];
        return newData.slice(-10); // Keep last 10 entries
      });
    }
  }, [PriceData]);

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Price Comparison</h2>
      {deliveryData.length > 0 ? (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={deliveryData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  borderColor: '#374151',
                  color: '#FFFFFF',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10B981"
                name="Actual Price"
                dot={{ fill: '#10B981' }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                name="Predicted Price"
                dot={{ fill: '#3B82F6' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
          No data available. Calculate prices to see the comparison.
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  isDark: boolean;
}

function StatCard({ icon, title, value, trend, isDark }: StatCardProps) {
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center gap-4">
        <div className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {icon}
        </div>
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          <p className={`text-sm ${
            trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ZoneCardProps {
  zone: string;
  status: string;
  drivers: string;
  traffic: string;
  basePrice: string;
  isDark: boolean;
}

function ZoneCard({ zone, status, drivers, traffic, basePrice, isDark }: ZoneCardProps) {
  return (
    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{zone}</h4>
        <span className={`px-2 py-1 text-xs rounded ${
          status === 'High Demand' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {status}
        </span>
      </div>
      <div className="space-y-1">
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Drivers: {drivers}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Traffic: {traffic}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Base Price: {basePrice}
        </p>
      </div>
    </div>
  );
}
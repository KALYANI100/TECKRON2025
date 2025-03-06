import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, MapPin, AlertTriangle } from 'lucide-react';

interface PricingDashboardProps {
  isDark: boolean;
}

const mockDeliveryData = [
  {  Order_ID: "ORD1", price: 51.7, predicted: 41 },
  {  Order_ID: "ORD2", price: 1.95, predicted: 2.40 },
  {  Order_ID: "ORD3", price: 3.85, predicted: 5.6185000000000045},
  {  Order_ID: "ORD4", price: 34.8, predicted: 39 },
  {  Order_ID: "ORD6", price: 7.92, predicted:8.36 }
];

const mockZoneData = [
  { zone: 'Downtown', active: 85, drivers: 15 },
  { zone: 'Suburban', active: 45, drivers: 12 },
  { zone: 'Business', active: 65, drivers: 25 },
];

export function PricingDashboard({ isDark }: PricingDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Active Deliveries"
          value="85"
          trend="+12%"
          isDark={isDark}
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Available Drivers"
          value="7"
          trend="-3"
          isDark={isDark}
        />
        <StatCard
          icon={<MapPin className="w-6 h-6" />}
          title="Surge Zones"
          value="2"
          trend="+1"
          isDark={isDark}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6" />}
          title="Average Price"
          value="₹35.50"
          trend="+15%"
          isDark={isDark}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Price Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockDeliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="time" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#E5E7EB',
                    color: isDark ? '#FFFFFF' : '#000000',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                  name="Actual Price"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Zone Activity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockZoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="zone" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#E5E7EB',
                    color: isDark ? '#FFFFFF' : '#000000',
                  }}
                />
                <Legend />
                <Bar dataKey="active" fill="#3B82F6" name="Active Deliveries" />
                <Bar dataKey="drivers" fill="#10B981" name="Available Drivers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone Status */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Zone Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ZoneCard
            zone="Downtown"
            status="High Demand"
            drivers="15/20"
            traffic="Congested"
            basePrice="$10/km"
            isDark={isDark}
          />
          <ZoneCard
            zone="Suburban Area"
            status="Normal"
            drivers="12/18"
            traffic="Light"
            basePrice="$15/km"
            isDark={isDark}
          />
          <ZoneCard
            zone="Business District"
            status="High Demand"
            drivers="25/30"
            traffic="Moderate"
            basePrice="$12/km"
            isDark={isDark}
          />
        </div>
      </div>
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

function StatCard({ icon, title, value,  isDark }: StatCardProps) {
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center gap-4">
        <div className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {icon}
        </div>
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
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
        <span
          className={`px-2 py-1 text-xs rounded ${
            status === 'High Demand' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {status}
        </span>
      </div>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Drivers: {drivers}</p>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Traffic: {traffic}</p>
      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Base Price: {basePrice}</p>
    </div>
  );
}

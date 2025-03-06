import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { PricingDashboard } from './components/PricingDashboard';
import { AdminPanel } from './components/AdminPanel';
import { usePricingStore } from './lib/store';
import { Moon, Sun } from 'lucide-react';

function App() {
  const isAdmin = usePricingStore((state) => state.isAdmin);
  const [isDark, setIsDark] = React.useState(false);
  const [priceData, setPriceData] = useState({
    price: null,
    predictedPrice: null,
    orderId: ''
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
  <img
    src="data:image/png;base64,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"
    alt="Logo"
    className="w-10 h-10 mr-2" // Adjust width and height as needed
  />
  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
    Smart Delivery Pricing
  </h1>
</div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${
              isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <PricingDashboard isDark={isDark} priceData={priceData} />
            </div>
            <div className="lg:col-span-4">
              <Calculator isDark={isDark} setPriceData={setPriceData} />
            </div>
          </div>
          
          {isAdmin && (
            <div className="mt-8">
              <AdminPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

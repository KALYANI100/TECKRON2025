import React from 'react';
import { Calculator } from './components/Calculator';
import { PricingDashboard } from './components/PricingDashboard';
import { AdminPanel } from './components/AdminPanel';
import { usePricingStore } from './lib/store';
import { Moon, Sun } from 'lucide-react';

function App() {
  const isAdmin = usePricingStore((state) => state.isAdmin);
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Smart Delivery Pricing
          </h1>
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
              <PricingDashboard isDark={isDark} />
            </div>
            <div className="lg:col-span-4">
              <Calculator isDark={isDark} />
            </div>
          </div>
          
          {isAdmin && (
            <div className="mt-8">
              <AdminPanel isDark={isDark} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
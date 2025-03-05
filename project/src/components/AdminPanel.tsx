import React, { useState } from 'react';
import { Settings, Plus, Save } from 'lucide-react';
import { usePricingStore } from '../lib/store';
import type { PricingRule } from '../lib/types';

export function AdminPanel() {
  const [newRule, setNewRule] = useState<Partial<PricingRule>>({
    name: '',
    ruleType: 'delivery',
    conditions: {},
    multiplier: 1,
    isActive: true,
  });

  const handleSaveRule = async () => {
    // TODO: Implement rule saving logic with Supabase
    console.log('Saving rule:', newRule);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Admin Controls
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Pricing Rule
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Name</label>
              <input
                type="text"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter rule name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rule Type</label>
              <select
                value={newRule.ruleType}
                onChange={(e) => setNewRule({ ...newRule, ruleType: e.target.value as 'delivery' | 'product' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="delivery">Delivery</option>
                <option value="product">Product</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price Multiplier</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newRule.multiplier}
                onChange={(e) => setNewRule({ ...newRule, multiplier: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newRule.isActive}
                onChange={(e) => setNewRule({ ...newRule, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">Active</label>
            </div>

            <button
              onClick={handleSaveRule}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Rule
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Active Rules</h3>
          <p className="text-gray-500 text-sm">No active rules found.</p>
        </div>
      </div>
    </div>
  );
}
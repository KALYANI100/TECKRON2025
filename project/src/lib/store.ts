import { create } from 'zustand';
import { type PricingFactors, type ProductPricing } from './types';

interface PricingStore {
  deliveryFactors: PricingFactors;
  setDeliveryFactors: (factors: Partial<PricingFactors>) => void;
  productPricing: ProductPricing[];
  setProductPricing: (pricing: ProductPricing[]) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const usePricingStore = create<PricingStore>((set) => ({
  deliveryFactors: {
    demandLevel: 1,
    trafficCongestion: 1,
    urgencyLevel: 1,
    driverAvailability: 5,
    distanceKm: 1,
    weatherImpact: 1,
    specialEvent: false,
    basePrice: 10,
  },
  setDeliveryFactors: (factors) =>
    set((state) => ({
      deliveryFactors: { ...state.deliveryFactors, ...factors },
    })),
  productPricing: [],
  setProductPricing: (pricing) => set({ productPricing: pricing }),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
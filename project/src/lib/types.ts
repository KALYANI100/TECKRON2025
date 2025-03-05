export interface PricingFactors {
  demandLevel: number;
  trafficCongestion: number;
  urgencyLevel: number;
  driverAvailability: number;
  distanceKm: number;
  weatherImpact: number;
  specialEvent: boolean;
  basePrice: number;
  pickupZone?: string;
  deliveryZone?: string;
  timeSlot?: string;
  packageSize?: string;
}

export interface ProductPricing {
  id: string;
  productName: string;
  basePrice: number;
  currentPrice: number;
  stockLevel: number;
  demandScore: number;
  competitorPrice?: number;
  lastUpdated: Date;
}

export interface PricingRule {
  id: string;
  name: string;
  ruleType: 'delivery' | 'product';
  conditions: Record<string, unknown>;
  multiplier: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
/*
  # Smart Pricing System Schema

  1. New Tables
    - pricing_rules
      - Stores admin-defined pricing rules and configurations
    - delivery_history
      - Historical delivery pricing data for ML training
    - product_pricing
      - Product pricing information and stock levels
    - demand_tracking
      - Real-time demand metrics for products and delivery
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pricing Rules Table
CREATE TABLE IF NOT EXISTS pricing_rules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  rule_type text NOT NULL CHECK (rule_type IN ('delivery', 'product')),
  conditions jsonb NOT NULL,
  multiplier numeric NOT NULL DEFAULT 1.0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Delivery History Table
CREATE TABLE IF NOT EXISTS delivery_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  demand_level integer NOT NULL CHECK (demand_level BETWEEN 1 AND 5),
  traffic_congestion integer NOT NULL CHECK (traffic_congestion BETWEEN 1 AND 5),
  urgency_level integer NOT NULL CHECK (urgency_level BETWEEN 1 AND 3),
  driver_availability integer NOT NULL CHECK (driver_availability BETWEEN 1 AND 5),
  distance_km numeric NOT NULL CHECK (distance_km > 0),
  weather_impact integer NOT NULL CHECK (weather_impact BETWEEN 1 AND 5),
  special_event boolean DEFAULT false,
  base_price numeric NOT NULL CHECK (base_price > 0),
  final_price numeric NOT NULL CHECK (final_price > 0),
  created_at timestamptz DEFAULT now()
);

-- Product Pricing Table
CREATE TABLE IF NOT EXISTS product_pricing (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name text NOT NULL,
  base_price numeric NOT NULL CHECK (base_price > 0),
  current_price numeric NOT NULL CHECK (current_price > 0),
  stock_level integer NOT NULL CHECK (stock_level >= 0),
  demand_score integer NOT NULL CHECK (demand_score BETWEEN 1 AND 5),
  competitor_price numeric,
  last_updated timestamptz DEFAULT now()
);

-- Demand Tracking Table
CREATE TABLE IF NOT EXISTS demand_tracking (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type text NOT NULL CHECK (entity_type IN ('delivery', 'product')),
  entity_id uuid NOT NULL,
  demand_level integer NOT NULL CHECK (demand_level BETWEEN 1 AND 5),
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_tracking ENABLE ROW LEVEL SECURITY;

-- Create admin role
CREATE ROLE admin;

-- RLS Policies
CREATE POLICY "Allow read access to all authenticated users"
  ON pricing_rules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to admins only"
  ON pricing_rules FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read access to delivery history"
  ON delivery_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to delivery history"
  ON delivery_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read access to product pricing"
  ON product_pricing FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to product pricing for admins"
  ON product_pricing FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read access to demand tracking"
  ON demand_tracking FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to demand tracking"
  ON demand_tracking FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pricing_rules_updated_at
    BEFORE UPDATE ON pricing_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
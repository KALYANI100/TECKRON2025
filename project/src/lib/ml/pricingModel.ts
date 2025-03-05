import * as tf from '@tensorflow/tfjs';
import type { PricingFactors } from '../types';

export class PricingModel {
  private model: tf.LayersModel | null = null;

  async initialize() {
    // Create a simple neural network for price prediction
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [7], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1 })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });
  }

  async train(data: PricingFactors[], prices: number[]) {
    if (!this.model) await this.initialize();

    const inputs = data.map(factor => [
      factor.demandLevel,
      factor.trafficCongestion,
      factor.urgencyLevel,
      factor.driverAvailability,
      factor.distanceKm,
      factor.weatherImpact,
      factor.specialEvent ? 1 : 0
    ]);

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(prices.map(p => [p]));

    await this.model!.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      shuffle: true
    });

    xs.dispose();
    ys.dispose();
  }

  async predict(factors: PricingFactors): Promise<number> {
    if (!this.model) await this.initialize();

    const input = tf.tensor2d([[
      factors.demandLevel,
      factors.trafficCongestion,
      factors.urgencyLevel,
      factors.driverAvailability,
      factors.distanceKm,
      factors.weatherImpact,
      factors.specialEvent ? 1 : 0
    ]]);

    const prediction = this.model!.predict(input) as tf.Tensor;
    const result = await prediction.data();
    
    input.dispose();
    prediction.dispose();

    // Apply base price and ensure minimum pricing
    return Math.max(factors.basePrice * result[0], factors.basePrice);
  }
}

export const pricingModel = new PricingModel();
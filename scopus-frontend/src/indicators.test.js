import { calculateIndicators } from './src/services/indicators';

describe('Indicators Tests', () => {
  test('should calculate citation count correctly', () => {
    const testData = {
      citations: [1, 2, 3, 4, 5]
    };
    const result = calculateIndicators(testData);
    expect(result.totalCitations).toBe(15);
  });

  test('should handle empty data', () => {
    const testData = {
      citations: []
    };
    const result = calculateIndicators(testData);
    expect(result.totalCitations).toBe(0);
  });

  test('should calculate h-index correctly', () => {
    const testData = {
      citations: [3, 0, 6, 1, 5]
    };
    const result = calculateIndicators(testData);
    expect(result.hIndex).toBe(3);
  });

  test('should handle negative citations', () => {
    const testData = {
      citations: [-1, 0, 3, -2, 5]
    };
    const result = calculateIndicators(testData);
    expect(result.totalCitations).toBe(5);
  });

  test('should handle large numbers', () => {
    const testData = {
      citations: [1000, 2000, 3000]
    };
    const result = calculateIndicators(testData);
    expect(result.totalCitations).toBe(6000);
    expect(result.hIndex).toBe(3);
  });
});

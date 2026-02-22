import {
  calculateCarbonFootprint,
  calculateTotalCarbon,
  getCarbonGrade,
  formatCarbonValue
} from '../carbonCalculations';

describe('Carbon Calculation Utilities', () => {
  describe('calculateCarbonFootprint', () => {
    test('should calculate carbon footprint for car travel', () => {
      const result = calculateCarbonFootprint('commute', 10, 'car');
      expect(result).toBe(2.1);
    });

    test('should calculate carbon footprint for bus travel', () => {
      const result = calculateCarbonFootprint('commute', 10, 'bus');
      expect(result).toBe(0.89);
    });

    test('should calculate carbon footprint for train travel', () => {
      const result = calculateCarbonFootprint('commute', 10, 'train');
      expect(result).toBe(0.41);
    });

    test('should return 0 for bike travel', () => {
      const result = calculateCarbonFootprint('commute', 10, 'bike');
      expect(result).toBe(0);
    });

    test('should return 0 for walking', () => {
      const result = calculateCarbonFootprint('commute', 10, 'walk');
      expect(result).toBe(0);
    });

    test('should handle unknown transport mode', () => {
      const result = calculateCarbonFootprint('commute', 10, 'spaceship');
      expect(result).toBe(0);
    });

    test('should round to 2 decimal places', () => {
      const result = calculateCarbonFootprint('commute', 7, 'car');
      expect(result).toBe(1.47);
    });

    test('should handle zero distance', () => {
      const result = calculateCarbonFootprint('commute', 0, 'car');
      expect(result).toBe(0);
    });
  });

  describe('calculateTotalCarbon', () => {
    test('should sum carbon values from logs', () => {
      const logs = [
        { id: 1, activity: 'commute', carbon: 2.1 },
        { id: 2, activity: 'shopping', carbon: 1.5 },
        { id: 3, activity: 'exercise', carbon: 0 }
      ];
      const result = calculateTotalCarbon(logs);
      expect(result).toBe(3.6);
    });

    test('should handle empty logs array', () => {
      const result = calculateTotalCarbon([]);
      expect(result).toBe(0);
    });

    test('should handle logs with missing carbon values', () => {
      const logs = [
        { id: 1, activity: 'commute' },
        { id: 2, activity: 'shopping', carbon: 1.5 }
      ];
      const result = calculateTotalCarbon(logs);
      expect(result).toBe(1.5);
    });
  });

  describe('getCarbonGrade', () => {
    test('should return A for carbon < 5', () => {
      expect(getCarbonGrade(3)).toBe('A');
      expect(getCarbonGrade(4.9)).toBe('A');
    });

    test('should return B for carbon < 10', () => {
      expect(getCarbonGrade(5)).toBe('B');
      expect(getCarbonGrade(9.9)).toBe('B');
    });

    test('should return C for carbon < 20', () => {
      expect(getCarbonGrade(10)).toBe('C');
      expect(getCarbonGrade(19.9)).toBe('C');
    });

    test('should return D for carbon < 30', () => {
      expect(getCarbonGrade(20)).toBe('D');
      expect(getCarbonGrade(29.9)).toBe('D');
    });

    test('should return F for carbon >= 30', () => {
      expect(getCarbonGrade(30)).toBe('F');
      expect(getCarbonGrade(50)).toBe('F');
    });

    test('should handle edge cases', () => {
      expect(getCarbonGrade(0)).toBe('A');
      expect(getCarbonGrade(-1)).toBe('A');
    });
  });

  describe('formatCarbonValue', () => {
    test('should format carbon value with proper units', () => {
      const result = formatCarbonValue(2.1234);
      expect(result).toBe('2.12 kg CO₂');
    });

    test('should handle integer values', () => {
      const result = formatCarbonValue(5);
      expect(result).toBe('5.00 kg CO₂');
    });

    test('should handle zero values', () => {
      const result = formatCarbonValue(0);
      expect(result).toBe('0.00 kg CO₂');
    });

    test('should handle small decimal values', () => {
      const result = formatCarbonValue(0.1);
      expect(result).toBe('0.10 kg CO₂');
    });
  });
});

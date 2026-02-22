// Utility functions for carbon footprint calculations

export const calculateCarbonFootprint = (activity, distance, transportMode) => {
  const carbonFactors = {
    car: 0.21, // kg CO2 per km
    bus: 0.089, // kg CO2 per km
    train: 0.041, // kg CO2 per km
    bike: 0, // kg CO2 per km
    walk: 0, // kg CO2 per km
  };

  const factor = carbonFactors[transportMode] || 0;
  return Math.round(distance * factor * 100) / 100;
};

export const calculateTotalCarbon = (logs) => {
  return logs.reduce((total, log) => total + (log.carbon || 0), 0);
};

export const getCarbonGrade = (totalCarbon) => {
  if (totalCarbon < 5) return 'A';
  if (totalCarbon < 10) return 'B';
  if (totalCarbon < 20) return 'C';
  if (totalCarbon < 30) return 'D';
  return 'F';
};

export const formatCarbonValue = (value) => {
  return `${value.toFixed(2)} kg CO₂`;
};

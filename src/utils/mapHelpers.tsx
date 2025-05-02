import { PollutionDataPoint, PollutionType } from '@/stores/pollutionDataStore';
import { COLORS, getAQIColor } from '@/styles/themes/colors';
import { AQI_RATINGS, POLLUTION_TYPE_THRESHOLDS } from '@/constants/aqi';

/**
 * Get data for a specific province
 * @param provinceName Name of the province
 * @param pollutionData Array of pollution data points
 * @returns Pollution data for the province
 */
export const getProvinceData = (
  provinceName: string,
  pollutionData: PollutionDataPoint[]
): PollutionDataPoint | undefined => {
  return pollutionData.find(item => item.location.key === provinceName);
};

/**
 * Formats a province name for display
 * @param name The raw province name
 * @returns Formatted name
 */
export const formatProvinceName = (name: string): string => {
  return name.replace(/_/g, ' ');
};

/**
 * Get color for a province based on pollution data
 * @param provinceData Pollution data for the province
 * @param pollutionType Type of pollution to consider
 * @returns Hex color code
 */
export const getProvinceColor = (
  provinceData: PollutionDataPoint | undefined,
  pollutionType: PollutionType
): string => {
  if (!provinceData) return COLORS.DEFAULT_PROVINCE;
  const value = provinceData.readings[pollutionType];

  return getAQIColor(value, pollutionType);
};

/**
 * Calculate AQI value based on pollutant concentration
 * @param value Pollutant concentration
 * @param pollutionType Type of pollutant
 * @returns AQI value
 */
export const getAQIValue = (value: number, pollutionType: PollutionType): number => {
  // AQI calculation logic based on pollutant type
  // This is a simplified version for demonstration
  switch (pollutionType) {
    case 'pm25':
      return Math.round(value * 4.5);
    case 'pm10':
      return Math.round(value * 2.5);
    case 'no2':
      return Math.round(value * 0.8);
    case 'o3':
      return Math.round(value * 1.2);
    default:
      return 0;
  }
};

/**
 * Get AQI rating classification text based on pollutant concentration
 * @param value Pollutant concentration
 * @param pollutionType Type of pollutant
 * @returns Rating classification text
 */
export const getAQIRating = (value: number, pollutionType: PollutionType): string => {
  const thresholds = POLLUTION_TYPE_THRESHOLDS[pollutionType];

  if (!thresholds) return AQI_RATINGS.UNKNOWN;

  if (value < thresholds.GOOD) return AQI_RATINGS.GOOD;
  if (value < thresholds.MODERATE) return AQI_RATINGS.MODERATE;
  if (value < thresholds.SENSITIVE) return AQI_RATINGS.SENSITIVE;
  if (value < thresholds.UNHEALTHY) return AQI_RATINGS.UNHEALTHY;
  if (value < thresholds.VERY_UNHEALTHY) return AQI_RATINGS.VERY_UNHEALTHY;
  return AQI_RATINGS.HAZARDOUS;
};

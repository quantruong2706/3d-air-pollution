import { ColorKey, COLORS } from '@/styles/themes/colors';
import { AQI_RATINGS, POLLUTION_TYPE_THRESHOLDS } from '@/constants/aqi';
import { PollutionDataPoint, PollutionType } from '@/types/3dVisualization';

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

// Air Quality Index color mapping based on pollutant type and value
export const getAQIColor = (value: number, pollutionType: PollutionType): string => {
  switch (pollutionType) {
    case 'pm25':
      if (value < 12) return COLORS.AQI_GOOD;
      if (value < 35.5) return COLORS.AQI_MODERATE;
      if (value < 55.5) return COLORS.AQI_SENSITIVE;
      if (value < 150.5) return COLORS.AQI_UNHEALTHY;
      if (value < 250.5) return COLORS.AQI_VERY_UNHEALTHY;
      return COLORS.AQI_HAZARDOUS;

    case 'pm10':
      if (value < 55) return COLORS.AQI_GOOD;
      if (value < 155) return COLORS.AQI_MODERATE;
      if (value < 255) return COLORS.AQI_SENSITIVE;
      if (value < 355) return COLORS.AQI_UNHEALTHY;
      if (value < 425) return COLORS.AQI_VERY_UNHEALTHY;
      return COLORS.AQI_HAZARDOUS;

    case 'no2':
      if (value < 54) return COLORS.AQI_GOOD;
      if (value < 101) return COLORS.AQI_MODERATE;
      if (value < 361) return COLORS.AQI_SENSITIVE;
      if (value < 650) return COLORS.AQI_UNHEALTHY;
      if (value < 1250) return COLORS.AQI_VERY_UNHEALTHY;
      return COLORS.AQI_HAZARDOUS;

    case 'o3':
      if (value < 55) return COLORS.AQI_GOOD;
      return COLORS.DEFAULT_PROVINCE;

    default:
      return COLORS.DEFAULT_PROVINCE;
  }
};

/**
 * Get CSS classes for a pollution value based on its AQI rating
 * @param value Pollutant concentration
 * @param type Type of pollutant
 * @returns CSS class string for styling
 */
export const getPollutionColorClass = (value: number, type: PollutionType): string => {
  const colorValue = getAQIColor(value, type);

  switch (colorValue) {
    case COLORS.AQI_GOOD:
      return 'text-sky-600 bg-sky-100';
    case COLORS.AQI_MODERATE:
      return 'text-green-600 bg-green-100';
    case COLORS.AQI_SENSITIVE:
      return 'text-yellow-600 bg-yellow-100';
    case COLORS.AQI_UNHEALTHY:
      return 'text-orange-600 bg-orange-100';
    case COLORS.AQI_VERY_UNHEALTHY:
      return 'text-red-600 bg-red-100';
    case COLORS.AQI_HAZARDOUS:
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Check if a city is currently active/selected
 * @param locationName City location name
 * @param activeMesh Currently active mesh name
 * @returns Boolean indicating if city is active
 */
export const isCityActive = (locationName: string, activeMesh: string | null): boolean => {
  return activeMesh === locationName;
};

/**
 * Get button styling class based on whether the button is currently active
 * @param isActive Whether the button is currently active
 * @returns CSS class string for button styling
 */
export const getButtonStyleClass = (isActive: boolean): string => {
  return isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
};

// Helper function to get pollutant name
export const getPollutantName = (pollutionType: string): string => {
  switch (pollutionType) {
    case 'pm25':
      return 'PM2.5 - Fine Particles';
    case 'pm10':
      return 'PM10 - Coarse Particles';
    case 'no2':
      return 'NO₂ - Nitrogen Dioxide';
    case 'o3':
      return 'O₃ - Ozone';
    default:
      return pollutionType.toUpperCase();
  }
};

// Helper function to get color value
export const getColor = (key: ColorKey): string => COLORS[key];

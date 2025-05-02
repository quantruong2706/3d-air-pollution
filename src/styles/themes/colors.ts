/**
 * Color palette definitions for the 3D Air Pollution Visualization project
 * All color codes used throughout the application should be defined here
 */

import { PollutionType } from '@/stores/pollutionDataStore';

// Base Colors
export const COLORS = {
  // Primary UI Colors
  PRIMARY: '#3b82f6',
  SECONDARY: '#10b981',
  ACCENT: '#8b5cf6',

  // Text & Background Colors
  TEXT_LIGHT: '#1f2937',
  TEXT_DARK: '#f9fafb',
  BACKGROUND_LIGHT: '#f9fafb',
  BACKGROUND_DARK: '#111827',
  BACKGROUND_APP_DARK: '#242424',

  // Visualization Colors
  WHITE: '#ffffff',
  BLACK: '#111111',
  INACTIVE_PROVINCE: '#808080',
  DEFAULT_PROVINCE: '#cccccc',

  // Air Quality Index Colors (AQI)
  AQI_GOOD: '#38BDF8', // Good - Sky blue
  AQI_MODERATE: '#4ADE80', // Moderate - Green
  AQI_SENSITIVE: '#FACC15', // Unhealthy for Sensitive Groups - Yellow
  AQI_UNHEALTHY: '#FB923C', // Unhealthy - Orange
  AQI_VERY_UNHEALTHY: '#EF4444', // Very Unhealthy - Red
  AQI_HAZARDOUS: '#9333EA', // Hazardous - Purple

  // Log Levels
  LOG_DEBUG: '#7C7C7C',
  LOG_INFO: '#2563EB',
  LOG_WARN: '#F59E0B',
  LOG_ERROR: '#DC2626',
} as const;

// Type for color constants
export type ColorKey = keyof typeof COLORS;

// Helper function to get color value
export const getColor = (key: ColorKey): string => COLORS[key];

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

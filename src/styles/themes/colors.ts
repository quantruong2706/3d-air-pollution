export const colorMap = {
  good: '#4ADE80', // Green
  moderate: '#FACC15', // Yellow
  poor: '#FB923C', // Orange
  veryPoor: '#EF4444', // Red
  hazardous: '#A855F7', // Purple
};

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

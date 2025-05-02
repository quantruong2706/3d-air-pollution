// AQI Rating Text Values
export const AQI_RATINGS = {
  GOOD: 'Good',
  MODERATE: 'Moderate',
  SENSITIVE: 'Unhealthy for Sensitive Groups',
  UNHEALTHY: 'Unhealthy',
  VERY_UNHEALTHY: 'Very Unhealthy',
  HAZARDOUS: 'Hazardous',
  UNKNOWN: 'Unknown',
} as const;

export type AQIRatingKey = keyof typeof AQI_RATINGS;

// PM2.5 thresholds (μg/m³)
export const PM25_THRESHOLDS = {
  GOOD: 12,
  MODERATE: 35.5,
  SENSITIVE: 55.5,
  UNHEALTHY: 150.5,
  VERY_UNHEALTHY: 250.5,
  HAZARDOUS: Number.MAX_VALUE,
} as const;

// PM10 thresholds (μg/m³)
export const PM10_THRESHOLDS = {
  GOOD: 55,
  MODERATE: 155,
  SENSITIVE: 255,
  UNHEALTHY: 355,
  VERY_UNHEALTHY: 425,
  HAZARDOUS: Number.MAX_VALUE,
} as const;

// NO2 thresholds (μg/m³)
export const NO2_THRESHOLDS = {
  GOOD: 54,
  MODERATE: 101,
  SENSITIVE: 361,
  UNHEALTHY: 650,
  VERY_UNHEALTHY: 1250,
  HAZARDOUS: Number.MAX_VALUE,
} as const;

// O3 thresholds (μg/m³)
export const O3_THRESHOLDS = {
  GOOD: 55,
  MODERATE: 105,
  SENSITIVE: 165,
  UNHEALTHY: 205,
  VERY_UNHEALTHY: 405,
  HAZARDOUS: Number.MAX_VALUE,
} as const;

/**
 * Maps pollution type to its corresponding threshold object
 */
export const POLLUTION_TYPE_THRESHOLDS = {
  pm25: PM25_THRESHOLDS,
  pm10: PM10_THRESHOLDS,
  no2: NO2_THRESHOLDS,
  o3: O3_THRESHOLDS,
} as const;

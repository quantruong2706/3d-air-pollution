export type PollutionType = 'pm25' | 'pm10' | 'no2' | 'o3';
export type QualityLevel = 'good' | 'moderate' | 'poor' | 'veryPoor' | 'hazardous';

export interface PollutionDataPoint {
  id: string;
  location: {
    key: string;
    name: string;
    lat: number;
    lng: number;
  };
  readings: {
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
    timestamp: string;
  };
}

export interface ThresholdValues {
  good: number;
  moderate: number;
  sensitive: number;
  unhealthy: number;
  veryUnhealthy: number;
  hazardous: number;
}

export interface ThresholdData {
  pm25: ThresholdValues;
  pm10: ThresholdValues;
  no2: ThresholdValues;
  o3: ThresholdValues;
}

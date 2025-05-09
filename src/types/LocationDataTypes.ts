export interface LocationData {
  name: string;
  readings: {
    pm25: number[];
    pm10: number[];
    no2: number[];
    o3: number[];
    timestamps: string[];
  };
}

export interface PollutionStats {
  pm25: { min: number; max: number; avg: number };
  pm10: { min: number; max: number; avg: number };
  no2: { min: number; max: number; avg: number };
  o3: { min: number; max: number; avg: number };
}

export interface ChartDataPoint {
  value: number;
  label: string;
  color: string;
}

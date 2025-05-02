import { create } from 'zustand';
import pollutionJsonData from '@/lib/db/data.json';

export type PollutionType = 'pm25' | 'pm10' | 'no2' | 'o3';

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

interface PollutionStore {
  pollutionData: PollutionDataPoint[];
  thresholds: ThresholdData;
  isLoading: boolean;
  error: string | null;
  activeLayer: PollutionType;
  threshold: number;
  selectedLocation: string | null;
  fetchPollutionData: () => Promise<void>;
  setActiveLayer: (layer: PollutionType) => void;
  setThreshold: (value: number) => void;
  setSelectedLocation: (id: string | null) => void;
}

export const usePollutionStore = create<PollutionStore>(set => ({
  pollutionData: [],
  thresholds: pollutionJsonData.thresholds as ThresholdData,
  isLoading: false,
  error: null,
  activeLayer: 'pm25',
  threshold: pollutionJsonData.thresholds.pm25.moderate,
  selectedLocation: null,

  fetchPollutionData: async () => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        set({
          pollutionData: pollutionJsonData.pollutionData as PollutionDataPoint[],
          isLoading: false,
        });
      }, 500);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch pollution data',
        isLoading: false,
      });
    }
  },

  setActiveLayer: layer => {
    const newThreshold = pollutionJsonData.thresholds[layer].moderate;
    set({ activeLayer: layer, threshold: newThreshold });
  },

  setThreshold: value => set({ threshold: value }),
  setSelectedLocation: id => set({ selectedLocation: id }),
}));

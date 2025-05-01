import { create } from 'zustand';
import Logger from '@/lib/logger';

// Define types for our pollution data
export interface PollutionDataPoint {
  id: string;
  location: {
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

interface PollutionDataState {
  // State
  pollutionData: PollutionDataPoint[];
  selectedLocation: string | null;
  activeLayer: 'pm25' | 'pm10' | 'no2' | 'o3';
  threshold: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSelectedLocation: (id: string | null) => void;
  setActiveLayer: (layer: 'pm25' | 'pm10' | 'no2' | 'o3') => void;
  setThreshold: (value: number) => void;
  fetchPollutionData: () => Promise<void>;
  clearError: () => void;
}

// Sample data for development
const sampleData: PollutionDataPoint[] = [
  {
    id: '1',
    location: { name: 'Downtown', lat: 40.712776, lng: -74.005974 },
    readings: {
      pm25: 12.4,
      pm10: 25.1,
      no2: 40.2,
      o3: 18.7,
      timestamp: '2025-04-29T10:30:00Z',
    },
  },
  {
    id: '2',
    location: { name: 'Industrial Zone', lat: 40.736054, lng: -73.994514 },
    readings: {
      pm25: 35.8,
      pm10: 58.3,
      no2: 67.9,
      o3: 22.1,
      timestamp: '2025-04-29T10:30:00Z',
    },
  },
  {
    id: '3',
    location: { name: 'Residential Area', lat: 40.748817, lng: -73.985428 },
    readings: {
      pm25: 8.2,
      pm10: 18.7,
      no2: 22.4,
      o3: 31.5,
      timestamp: '2025-04-29T10:30:00Z',
    },
  },
  {
    id: '4',
    location: { name: 'Park Zone', lat: 40.779437, lng: -73.963244 },
    readings: {
      pm25: 5.1,
      pm10: 12.3,
      no2: 18.7,
      o3: 42.2,
      timestamp: '2025-04-29T10:30:00Z',
    },
  },
  {
    id: '5',
    location: { name: 'Commercial District', lat: 40.758896, lng: -73.98513 },
    readings: {
      pm25: 22.3,
      pm10: 37.4,
      no2: 55.1,
      o3: 25.8,
      timestamp: '2025-04-29T10:30:00Z',
    },
  },
];

export const usePollutionStore = create<PollutionDataState>(set => ({
  pollutionData: [],
  selectedLocation: null,
  activeLayer: 'pm25',
  threshold: 30,
  isLoading: false,
  error: null,

  setSelectedLocation: id => set({ selectedLocation: id }),
  setActiveLayer: layer => set({ activeLayer: layer }),
  setThreshold: value => set({ threshold: value }),
  clearError: () => set({ error: null }),

  fetchPollutionData: async () => {
    Logger.info('Fetching pollution data');
    set({ isLoading: true, error: null });

    // Simulate API request with a delay
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Uncomment to simulate an error occasionally for testing
      // if (Math.random() > 0.7) throw new Error("Network connection failed");

      Logger.debug('Pollution data loaded successfully', { count: sampleData.length });
      set({
        pollutionData: sampleData,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Logger.error('Error fetching pollution data:', errorMessage);
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },
}));

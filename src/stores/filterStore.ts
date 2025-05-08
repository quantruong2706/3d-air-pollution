import { create } from 'zustand';
import { COLORS } from '@/styles/themes/colors';
import { PollutionType } from '@/types/3dVisualization';

export interface Filter {
  label: string;
  color: string;
  range: [number, number];
  pollutionType: PollutionType;
}

interface FilterState {
  activeFilter: Filter | null;
  filters: Filter[];
  setActiveFilter: (filter: Filter | null) => void;
}

// AQI filter ranges by pollution type
export const filters: Filter[] = [
  // PM2.5 Filters
  { label: 'Good (0-12 μg/m³)', color: COLORS.AQI_GOOD, range: [0, 12], pollutionType: 'pm25' },
  {
    label: 'Moderate (12.1-35.4 μg/m³)',
    color: COLORS.AQI_MODERATE,
    range: [12.1, 35.4],
    pollutionType: 'pm25',
  },
  {
    label: 'Unhealthy for Sensitive Groups (35.5-55.4 μg/m³)',
    color: COLORS.AQI_SENSITIVE,
    range: [35.5, 55.4],
    pollutionType: 'pm25',
  },
  { label: 'Unhealthy', color: COLORS.AQI_UNHEALTHY, range: [55.5, 150.5], pollutionType: 'pm25' },
  {
    label: 'Very Unhealthy',
    color: COLORS.AQI_VERY_UNHEALTHY,
    range: [150.5, 250.5],
    pollutionType: 'pm25',
  },
  { label: 'Hazardous', color: COLORS.AQI_HAZARDOUS, range: [250.5, 500], pollutionType: 'pm25' },

  // PM10 Filters
  { label: 'Good (0-55 μg/m³)', color: COLORS.AQI_GOOD, range: [0, 55], pollutionType: 'pm10' },
  {
    label: 'Moderate (55-155 μg/m³)',
    color: COLORS.AQI_MODERATE,
    range: [55, 155],
    pollutionType: 'pm10',
  },
  {
    label: 'Unhealthy for Sensitive Groups (155-255 μg/m³)',
    color: COLORS.AQI_SENSITIVE,
    range: [155, 255],
    pollutionType: 'pm10',
  },
  { label: 'Unhealthy', color: COLORS.AQI_UNHEALTHY, range: [255, 355], pollutionType: 'pm10' },
  {
    label: 'Very Unhealthy',
    color: COLORS.AQI_VERY_UNHEALTHY,
    range: [355, 425],
    pollutionType: 'pm10',
  },
  { label: 'Hazardous', color: COLORS.AQI_HAZARDOUS, range: [425, 604], pollutionType: 'pm10' },
];

export const useFilterStore = create<FilterState>(set => ({
  activeFilter: null,
  filters,
  setActiveFilter: filter => set({ activeFilter: filter }),
}));

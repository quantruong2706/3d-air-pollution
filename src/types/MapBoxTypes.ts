/**
 * MapBox style options
 */
export const MAPBOX_STYLES = {
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11',
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  SATELLITE: 'mapbox://styles/mapbox/satellite-streets-v12',
} as const;

export interface IFactoryItem {
  id: string;
  name: string;
  coordinates: [number, number, number];
  modelPath: string;
  scale?: number;
  address: string;
  phone?: string;
  status: 'available' | 'full';
  patients: number;
  city: string;
}

export type MapBoxStyle = (typeof MAPBOX_STYLES)[keyof typeof MAPBOX_STYLES];

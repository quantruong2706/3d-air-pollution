import { MAPBOX_STYLES } from '@/constants/mapStyles';

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

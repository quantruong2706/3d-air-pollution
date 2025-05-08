/**
 * MapBox style constants
 */

export const MAP_STYLE_TYPES = {
  STREETS: 'STREETS',
  SATELLITE: 'SATELLITE',
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const;

export type MapStyleType = keyof typeof MAP_STYLE_TYPES;

/**
 * MapBox style URLs
 */
export const MAPBOX_STYLES = {
  [MAP_STYLE_TYPES.STREETS]: 'mapbox://styles/mapbox/streets-v12',
  [MAP_STYLE_TYPES.SATELLITE]: 'mapbox://styles/mapbox/satellite-streets-v12',
  [MAP_STYLE_TYPES.LIGHT]: 'mapbox://styles/mapbox/light-v11',
  [MAP_STYLE_TYPES.DARK]: 'mapbox://styles/mapbox/dark-v11',
} as const;

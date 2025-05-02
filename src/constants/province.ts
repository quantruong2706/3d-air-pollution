import * as THREE from 'three';
import { COLORS } from '@/styles/themes/colors';

// Constants for visualization parameters
export const HOVER_ELEVATION: number = 0.02; // Height to elevate province when hovered
export const ELEVATION_TRANSITION_SPEED: number = 0.05; // Speed of elevation animation
export const DEFAULT_ELEVATION: number = 0; // Default province elevation
export const INACTIVE_PROVINCE_COLOR: string = COLORS.INACTIVE_PROVINCE; // Gray color for inactive provinces

// Text position constants
export const PROVINCE_NAME_POSITION = new THREE.Vector3(0, 0.01, 0.01);
export const POLLUTION_DATA_POSITION = new THREE.Vector3(0, 0.01, -0.05);

// Material properties
export const MATERIAL_PROPERTIES = {
  roughness: 0.8,
  metalness: 0,
  flatShading: true,
};

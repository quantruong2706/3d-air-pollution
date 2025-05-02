import * as THREE from 'three';
import { create } from 'zustand';

interface MapState {
  cameraPosition: THREE.Vector3;
  activeMesh: string | null;
  setCameraPosition: (payload: { activeMesh?: string | null }) => void;
  isResetCamera: boolean;
  resetCamera: (payload: boolean) => void;
}

/**
 * Store for managing the map's camera position, active province,
 * and camera reset state for the air pollution visualization
 */
export const useMapStore = create<MapState>(set => ({
  // Initial camera position optimized for Vietnam map viewing
  cameraPosition: new THREE.Vector3(1.0959887504577637, 0.005898133385926485, 0.19488362967967987),

  // Currently selected province/mesh
  activeMesh: null,

  // Set active province/mesh
  setCameraPosition: payload => {
    set(() => ({
      activeMesh: payload.activeMesh,
    }));
  },

  // Flag to trigger camera reset
  isResetCamera: false,

  // Toggle camera reset state
  resetCamera: payload => {
    set(() => ({ isResetCamera: payload }));
  },
}));

export default useMapStore;

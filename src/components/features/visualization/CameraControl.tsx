import useMapStore from '@/stores/mapStore';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

const CameraControl = () => {
  const activeMesh = useMapStore(state => state.activeMesh);
  const [activeCameraMesh, setActiveCameraMesh] = useState('');

  useFrame(({ camera, scene }) => {
    const target = new THREE.Vector3();
    if (activeCameraMesh !== activeMesh && activeMesh) {
      scene.getObjectByName(activeMesh)?.getWorldPosition(target);

      const cameraPosition = new THREE.Vector3(target.x, target.y + 3, target.z + 7);

      camera.position.lerp(cameraPosition, 0.05);

      const sceneWithControls = scene as THREE.Scene & {
        orbitControls?: { target: THREE.Vector3; update: () => void };
      };
      sceneWithControls.orbitControls?.target.lerp(target, 0.05);
      sceneWithControls.orbitControls?.update();

      const diff = camera.position.clone().sub(cameraPosition).length();

      if (diff < 1) setActiveCameraMesh(activeMesh);
    }
  });
  return null;
};

export default CameraControl;

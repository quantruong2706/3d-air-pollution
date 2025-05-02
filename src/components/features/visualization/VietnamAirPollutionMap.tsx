import { useGLTF, OrbitControls } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Lights from './Lights';
import ProvinceRenderer from './ProvinceRenderer';

import { usePollutionStore } from '@/stores/pollutionDataStore';
import CameraControl from './CameraControl';

const VietnamAirPollutionMap: React.FC<GroupProps> = props => {
  const mapRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/vietnam-map.gltf');

  const { pollutionData, activeLayer, fetchPollutionData } = usePollutionStore();

  useEffect(() => {
    fetchPollutionData();
  }, [fetchPollutionData]);

  return (
    <>
      <OrbitControls attach="orbitControls" />
      <Lights />
      <CameraControl />
      <group ref={mapRef} {...props} dispose={null} position={[0, 0, 1]} scale={10}>
        <ProvinceRenderer scene={scene} pollutionData={pollutionData} activeLayer={activeLayer} />
      </group>
    </>
  );
};

export default VietnamAirPollutionMap;

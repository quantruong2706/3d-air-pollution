import { JSX } from 'react';
import * as THREE from 'three';
import { PollutionDataPoint, PollutionType } from '@/stores/pollutionDataStore';
import Province from './Province';
import { getProvinceColor, getProvinceData } from '@/utils/mapHelpers';

interface ProvinceRendererProps {
  scene: THREE.Group;
  pollutionData: PollutionDataPoint[];
  activeLayer: PollutionType;
}

const ProvinceRenderer: React.FC<ProvinceRendererProps> = ({
  scene,
  pollutionData,
  activeLayer,
}) => {
  if (!scene || scene.children.length === 0) {
    return null;
  }

  const provinces: JSX.Element[] = [];

  scene.traverse(child => {
    if (child instanceof THREE.Mesh) {
      const provinceData = getProvinceData(child.name, pollutionData);
      const color = getProvinceColor(provinceData, activeLayer);

      provinces.push(
        <Province
          key={child.name}
          name={child.name}
          position={child.position}
          geometry={child.geometry}
          color={color}
          provinceData={provinceData}
          pollutionType={activeLayer}
        />
      );
    }
  });

  return <>{provinces}</>;
};

export default ProvinceRenderer;

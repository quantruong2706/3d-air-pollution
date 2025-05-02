import useMapStore from '@/stores/mapStore';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import TextGenerate from './TextGenerate';
import { PollutionDataPoint, PollutionType } from '@/stores/pollutionDataStore';
import { useFilterStore } from '@/stores/filterStore';
import { useCursorPointer } from '@/lib/hooks/useCursorPointer';
import { formatProvinceName, getAQIValue, getAQIRating } from '@/utils/mapHelpers';
import { COLORS } from '@/styles/themes/colors';
import {
  DEFAULT_ELEVATION,
  ELEVATION_TRANSITION_SPEED,
  HOVER_ELEVATION,
  INACTIVE_PROVINCE_COLOR,
  MATERIAL_PROPERTIES,
  POLLUTION_DATA_POSITION,
  PROVINCE_NAME_POSITION,
} from '@/constants/province';

interface ProvinceProps {
  name: string;
  color: string;
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
  provinceData?: PollutionDataPoint;
  pollutionType: PollutionType;
}

const Province = ({
  name,
  color,
  position,
  geometry,
  provinceData,
  pollutionType,
}: ProvinceProps) => {
  const provinceRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const setCameraPosition = useMapStore(state => state.setCameraPosition);
  const activeMesh = useMapStore(state => state.activeMesh);
  const { activeFilter } = useFilterStore();

  useCursorPointer(hovered);

  useFrame(() => {
    if (provinceRef.current) {
      provinceRef.current.position.y = THREE.MathUtils.lerp(
        provinceRef.current.position.y,
        hovered || activeMesh === name ? HOVER_ELEVATION : DEFAULT_ELEVATION,
        ELEVATION_TRANSITION_SPEED
      );
    }
  });

  // Calculate display color based on filter
  const displayColor = activeFilter
    ? activeFilter.color === color
      ? color // Keep original color if it matches filter
      : INACTIVE_PROVINCE_COLOR
    : color; // No filter, show original color

  const getPollutionText = () => {
    if (!provinceData) return 'No data available';
    const readings = provinceData.readings;
    const pollutionValue = readings[pollutionType];
    const aqiValue = getAQIValue(pollutionValue, pollutionType);

    return `${pollutionType.toUpperCase()}: ${pollutionValue} μg/m³ \n AQI: ${aqiValue} - ${getAQIRating(pollutionValue, pollutionType)}`;
  };

  return (
    <group
      ref={provinceRef}
      name={name || undefined}
      onClick={() => {
        setCameraPosition({ activeMesh: name });
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={position}
    >
      {/* Province name */}
      <TextGenerate
        name={name ?? ''}
        animate={false}
        position={PROVINCE_NAME_POSITION}
        text={formatProvinceName(name)}
        hovered={hovered}
        // color={COLORS.WHITE}
        color={activeMesh === name ? COLORS.BLACK : COLORS.WHITE}
      />

      {/* Pollution data - only shown when hovered or selected */}
      <TextGenerate
        name={name ?? ''}
        color={COLORS.BLACK}
        animate
        position={POLLUTION_DATA_POSITION}
        text={getPollutionText()}
        hovered={hovered}
        textAlign="left"
      />

      {/* Province mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: displayColor,
            ...MATERIAL_PROPERTIES,
          })
        }
      />
    </group>
  );
};

export default Province;

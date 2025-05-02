import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import useMapStore from '@/stores/mapStore';

interface TextGenerateProps {
  text: React.ReactNode;
  hovered: boolean;
  position: THREE.Vector3;
  animate: boolean;
  color: string;
  name: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const DEFAULT_HEIGHT = 0.02; // Default position higher than before
export const HOVER_HEIGHT = 0.08; // Hover position higher than before

const TextGenerate = ({
  text,
  hovered,
  position,
  animate,
  color,
  name,
  textAlign = 'left',
}: TextGenerateProps) => {
  const ref = useRef<THREE.Mesh>(null);

  const textProps = {
    fontSize: 0.015,
    textAlign,
  };

  const activeMesh = useMapStore(state => state.activeMesh);

  useFrame(() => {
    if (animate && ref.current) {
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        activeMesh === name || hovered ? HOVER_HEIGHT : DEFAULT_HEIGHT,
        0.08
      );
    }
  });

  // Adjust initial position to be higher off the map
  const adjustedPosition = new THREE.Vector3(position.x, position.y + DEFAULT_HEIGHT, position.z);

  return (
    <Text
      ref={ref}
      position={adjustedPosition}
      material-toneMapped={false}
      color={color}
      {...textProps}
    >
      {!animate ? text : (activeMesh === name || hovered) && text}
    </Text>
  );
};

export default TextGenerate;

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QualityLevel } from '@/types/3dVisualization';
import { colorMap } from '@/styles/themes/colors';

interface AirQualitySphereProps {
  size?: number;
  quality?: QualityLevel;
  value?: number;
  rotate?: boolean;
  pulseIntensity?: number;
}

const particleDensityMap = {
  good: 20,
  moderate: 40,
  poor: 70,
  veryPoor: 100,
  hazardous: 150,
};

const AirQualitySphere: React.FC<AirQualitySphereProps> = ({
  size = 3,
  quality = 'moderate',
  value = 0,
  rotate = true,
  pulseIntensity = 0.05,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const baseColor = colorMap[quality];

  // Create particles according to pollution level
  useEffect(() => {
    if (!particlesRef.current) return;

    const particleCount = particleDensityMap[quality];
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = [];

    for (let i = 0; i < particleCount; i++) {
      // Random position inside the sphere
      const radius = size * 0.8 * Math.random();
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlesPositions.push(x, y, z);
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particlesPositions, 3)
    );

    particlesRef.current.geometry = particlesGeometry;
  }, [size, quality]);

  // Animate the sphere
  useFrame(({ clock }) => {
    if (!sphereRef.current || !particlesRef.current) return;

    if (rotate) {
      // Rotate sphere slowly
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    // Pulsing effect
    const pulse = Math.sin(clock.getElapsedTime() * 2) * pulseIntensity + 1;
    sphereRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group>
      {/* Semi-transparent sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial
          color={baseColor}
          transparent={true}
          opacity={0.3}
          emissive={baseColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Particles inside sphere representing pollutants */}
      <points ref={particlesRef}>
        <pointsMaterial
          size={0.1}
          color={baseColor}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Text label showing value (optional) */}
      {value > 0 && (
        <group position={[0, -size - 0.5, 0]}>
          <mesh>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="white" transparent opacity={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default AirQualitySphere;

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import AirQualitySphere from './AirQualitySphere';
import { PollutionType, QualityLevel } from '@/types/3dVisualization';
import { getPollutantName } from '@/utils/mapHelpers';

interface PollutionVisualizationSceneProps {
  pollutionType: PollutionType;
  pollutionValue: number;
  quality: QualityLevel;
  height?: number;
}

const PollutionVisualizationScene: React.FC<PollutionVisualizationSceneProps> = ({
  pollutionType,
  pollutionValue,
  quality,
  height = 300,
}) => {
  return (
    <div
      style={{ height: `${height}px`, width: '100%' }}
      className="relative rounded-lg overflow-hidden"
    >
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <AirQualitySphere size={2} quality={quality} value={pollutionValue} />
      </Canvas>

      <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm p-2 text-white">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{getPollutantName(pollutionType)}</span>
          <span className="text-lg font-bold">{pollutionValue} µg/m³</span>
        </div>
      </div>
    </div>
  );
};

export default PollutionVisualizationScene;

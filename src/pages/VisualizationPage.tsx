import { Canvas } from '@react-three/fiber';
import VietnamAirPollutionMap from '@/components/features/visualization/VietnamAirPollutionMap';
import { AirPollutionTypeFilter } from '@/components/features/visualization/AirPollutionTypeFilter';

const AirPollutionMap: React.FC = () => {
  return (
    <div className="w-screen h-screen relative">
      <AirPollutionTypeFilter />
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{
          position: [0, 59, 36],
          fov: 45,
        }}
        className="w-full h-full"
      >
        <VietnamAirPollutionMap />
      </Canvas>
    </div>
  );
};

export default AirPollutionMap;

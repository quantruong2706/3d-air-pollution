import { Canvas } from '@react-three/fiber';
import VietnamAirPollutionMap from '@/components/features/visualization/VietnamAirPollutionMap';
import AirPollutionTypeFilter from '@/components/features/visualization/AirPollutionTypeFilter';
import TopCitiesTables from '@/components/features/visualization/TopCitiesTables';
import CityAirPollutionList from '@/components/features/visualization/CityAirPollutionList';

const AirPollutionMap: React.FC = () => {
  return (
    <div className="w-screen h-screen relative">
      <AirPollutionTypeFilter />
      <TopCitiesTables />
      <CityAirPollutionList />
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

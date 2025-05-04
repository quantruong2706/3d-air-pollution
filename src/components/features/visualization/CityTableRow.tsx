import { useCallback, memo } from 'react';
import { getPollutionColorClass, getAQIRating, isCityActive } from '@/utils/mapHelpers';
import useMapStore from '@/stores/mapStore';
import { PollutionDataPoint, PollutionType } from '@/types/3dVisualization';

interface CityTableRowProps {
  readonly city: PollutionDataPoint;
  readonly activeLayer: PollutionType;
}

const CityTableRow: React.FC<CityTableRowProps> = memo(({ city, activeLayer }) => {
  const setCameraPosition = useMapStore(state => state.setCameraPosition);
  const activeMesh = useMapStore(state => state.activeMesh);

  const handleCityClick = useCallback(() => {
    setCameraPosition({
      activeMesh: city.location.key,
    });
  }, [city.location.key, setCameraPosition]);

  const isActive = isCityActive(city.location.name, activeMesh);
  const pollutionValue = city.readings[activeLayer];
  const ratingText = getAQIRating(pollutionValue, activeLayer);
  const colorClass = getPollutionColorClass(pollutionValue, activeLayer);

  return (
    <tr
      key={city.id}
      className={`border-b hover:bg-gray-100 cursor-pointer transition-colors ${
        isActive ? 'bg-blue-50' : ''
      }`}
      onClick={handleCityClick}
      title={`Click to focus on ${city.location.name}`}
    >
      <td className="px-2 py-2">{city.id}</td>
      <td className="px-2 py-2 font-medium">{city.location.name}</td>
      <td className="px-2 py-2">
        <span
          className={`px-2 py-1 rounded text-xs inline-block w-full text-center ${colorClass}`}
          title={ratingText}
        >
          {pollutionValue} µg/m³
        </span>
      </td>
    </tr>
  );
});

export default CityTableRow;

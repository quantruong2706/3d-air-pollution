import { useMemo, useCallback } from 'react';
import { pollutionTypes } from '@/constants/aqi';
import useMapStore from '@/stores/mapStore';
import { getPollutionColorClass, getAQIRating, isCityActive } from '@/utils/mapHelpers';
import { PollutionDataPoint, PollutionType } from '@/types/3dVisualization';

interface TopCityTableProps {
  readonly data: ReadonlyArray<PollutionDataPoint>;
  readonly title: string;
  readonly activeLayer: PollutionType;
}

const TopCityTable: React.FC<TopCityTableProps> = ({ data, title, activeLayer }) => {
  const setCameraPosition = useMapStore(state => state.setCameraPosition);
  const activeMesh = useMapStore(state => state.activeMesh);

  const activeLayerLabel = useMemo(() => {
    const pollutionType = pollutionTypes.find(type => type.value === activeLayer);
    return pollutionType?.label || activeLayer.toUpperCase();
  }, [activeLayer]);

  const handleCityClick = useCallback(
    (locationKey: string) => {
      setCameraPosition({
        activeMesh: locationKey,
      });
    },
    [setCameraPosition]
  );

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-2 py-1.5 text-left text-xs">Rank</th>
            <th className="px-2 py-1.5 text-left text-xs">City</th>
            <th className="px-2 py-1.5 text-left text-xs">{activeLayerLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((city, index) => {
            const pollutionValue = city.readings[activeLayer];
            const ratingText = getAQIRating(pollutionValue, activeLayer);
            const colorClass = getPollutionColorClass(pollutionValue, activeLayer);
            const isActive = isCityActive(city.location.name, activeMesh);

            return (
              <tr
                key={city.id}
                className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                  isActive ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleCityClick(city.location.key)}
                title={`Click to focus on ${city.location.name}`}
              >
                <td className="px-2 py-1.5 text-xs">{index + 1}</td>
                <td
                  className="px-2 py-1.5 text-xs font-medium truncate max-w-[120px]"
                  title={city.location.name}
                >
                  {city.location.name}
                </td>
                <td className="px-2 py-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-xs inline-block w-full text-center ${colorClass}`}
                    title={ratingText}
                  >
                    {pollutionValue}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TopCityTable;

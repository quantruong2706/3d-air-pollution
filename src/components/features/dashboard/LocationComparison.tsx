import React from 'react';
import { MapPin, CloudFog, Cloud, Factory, Zap } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { PollutionType } from '@/types/3dVisualization';
import { LocationData } from '@/types/LocationDataTypes';

interface LocationComparisonProps {
  locationData: LocationData[];
  getAirQualityStatus: (
    value: number,
    pollutant: PollutionType
  ) => {
    status: string;
    color: string;
    qualityLevel: string;
  };
  getPollutantIcon: (pollutant: PollutionType) => JSX.Element;
}

const LocationComparison: React.FC<LocationComparisonProps> = ({
  locationData,
  getAirQualityStatus,
  getPollutantIcon,
}) => {
  return (
    <div className="mb-6">
      <DashboardCard
        title="Location Comparison"
        icon={<MapPin size={18} />}
        accentColor="indigo"
        noPadding
        headerRightContent={
          <span className="text-sm text-gray-500">{locationData.length} monitoring stations</span>
        }
      >
        <div className="h-[400px] overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
              <tr>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">PM2.5</th>
                <th className="px-4 py-3">PM10</th>
                <th className="px-4 py-3">NO₂</th>
                <th className="px-4 py-3">O₃</th>
                <th className="px-4 py-3">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {locationData.map((location, index) => {
                // For simplicity, use the first reading for each location
                // In a real app we would use averages or the most recent reading
                const pm25 = location.readings.pm25[0];
                const pm10 = location.readings.pm10[0];
                const no2 = location.readings.no2[0];
                const o3 = location.readings.o3[0];

                // Determine the worst pollutant for overall status
                const pm25Status = getAirQualityStatus(pm25, 'pm25');
                const pm10Status = getAirQualityStatus(pm10, 'pm10');
                const no2Status = getAirQualityStatus(no2, 'no2');
                const o3Status = getAirQualityStatus(o3, 'o3');

                // Get worst status (very simplified approach for demo)
                const statusValues = [pm25Status, pm10Status, no2Status, o3Status].map(s => {
                  switch (s.status) {
                    case 'Good':
                      return 1;
                    case 'Moderate':
                      return 2;
                    case 'Poor':
                      return 3;
                    case 'Very Poor':
                      return 4;
                    case 'Hazardous':
                      return 5;
                    default:
                      return 0;
                  }
                }) as (0 | 1 | 2 | 3 | 4 | 5)[];

                const worstStatusIndex = statusValues.indexOf(
                  Math.max(...statusValues) as 0 | 1 | 2 | 3 | 4 | 5
                );
                const overallStatus = [pm25Status, pm10Status, no2Status, o3Status][
                  worstStatusIndex
                ];

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      {location.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${pm25Status.color}`}
                      >
                        <CloudFog size={12} />
                        {pm25} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${pm10Status.color}`}
                      >
                        <Cloud size={12} />
                        {pm10} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${no2Status.color}`}
                      >
                        <Factory size={12} />
                        {no2} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${o3Status.color}`}
                      >
                        <Zap size={12} />
                        {o3} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${overallStatus.color} flex items-center gap-1`}
                      >
                        {getPollutantIcon(
                          ['pm25', 'pm10', 'no2', 'o3'][worstStatusIndex] as PollutionType
                        )}
                        {overallStatus.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default LocationComparison;

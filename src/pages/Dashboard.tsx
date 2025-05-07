import React, { useEffect, useState } from 'react';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import Logger from '@/lib/logger';
import { PollutionType } from '@/types/3dVisualization';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface PollutionStats {
  pm25: { min: number; max: number; avg: number };
  pm10: { min: number; max: number; avg: number };
  no2: { min: number; max: number; avg: number };
  o3: { min: number; max: number; avg: number };
}

interface LocationData {
  name: string;
  readings: {
    pm25: number[];
    pm10: number[];
    no2: number[];
    o3: number[];
    timestamps: string[];
  };
}

const Dashboard: React.FC = () => {
  const { pollutionData, isLoading, error, fetchPollutionData } = usePollutionStore();
  const [stats, setStats] = useState<PollutionStats>({
    pm25: { min: 0, max: 0, avg: 0 },
    pm10: { min: 0, max: 0, avg: 0 },
    no2: { min: 0, max: 0, avg: 0 },
    o3: { min: 0, max: 0, avg: 0 },
  });

  const [locationData, setLocationData] = useState<LocationData[]>([]);

  // Calculate stats when pollution data changes
  useEffect(() => {
    if (pollutionData.length === 0) return;

    Logger.info('Calculating dashboard statistics');

    // Process data for stats calculations
    const pm25Values = pollutionData.map(p => p.readings.pm25);
    const pm10Values = pollutionData.map(p => p.readings.pm10);
    const no2Values = pollutionData.map(p => p.readings.no2);
    const o3Values = pollutionData.map(p => p.readings.o3);

    // Calculate min, max, avg for each pollutant
    const calculateStats = (values: number[]) => {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
      return { min, max, avg };
    };

    setStats({
      pm25: calculateStats(pm25Values),
      pm10: calculateStats(pm10Values),
      no2: calculateStats(no2Values),
      o3: calculateStats(o3Values),
    });

    // For a real app with time-series data, we would process the data to group by location
    // This is just for demonstration with our sample data
    const locationGroups: { [key: string]: LocationData } = {};

    pollutionData.forEach(point => {
      const locName = point.location.name;

      if (!locationGroups[locName]) {
        locationGroups[locName] = {
          name: locName,
          readings: {
            pm25: [],
            pm10: [],
            no2: [],
            o3: [],
            timestamps: [],
          },
        };
      }

      // Add readings
      locationGroups[locName].readings.pm25.push(point.readings.pm25);
      locationGroups[locName].readings.pm10.push(point.readings.pm10);
      locationGroups[locName].readings.no2.push(point.readings.no2);
      locationGroups[locName].readings.o3.push(point.readings.o3);
      locationGroups[locName].readings.timestamps.push(point.readings.timestamp);
    });

    setLocationData(Object.values(locationGroups));
  }, [pollutionData]);

  useEffect(() => {
    Logger.info('Dashboard component mounted');
    fetchPollutionData();
  }, [fetchPollutionData]);

  // Helper to determine air quality status
  const getAirQualityStatus = (
    value: number,
    pollutant: PollutionType
  ): { status: string; color: string } => {
    // WHO guidelines
    const thresholds = {
      pm25: { good: 5, moderate: 15, poor: 25, veryPoor: 50 },
      pm10: { good: 15, moderate: 45, poor: 75, veryPoor: 100 },
      no2: { good: 10, moderate: 25, poor: 50, veryPoor: 100 },
      o3: { good: 50, moderate: 100, poor: 150, veryPoor: 200 },
    };

    const t = thresholds[pollutant];

    if (value <= t.good) return { status: 'Good', color: 'text-green-600 bg-green-100' };
    if (value <= t.moderate) return { status: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    if (value <= t.poor) return { status: 'Poor', color: 'text-orange-600 bg-orange-100' };
    if (value <= t.veryPoor) return { status: 'Very Poor', color: 'text-red-600 bg-red-100' };
    return { status: 'Hazardous', color: 'text-purple-600 bg-purple-100' };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Air Pollution Dashboard</h1>
        <div className="flex justify-center">
          <LoadingSpinner text="Loading dashboard data..." size="medium" variant="dark" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Air Pollution Dashboard</h1>
        <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Air Pollution Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            PM2.5
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-gray-500">Min</p>
              <p className="font-medium">{stats.pm25.min} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg</p>
              <p className="font-medium">{stats.pm25.avg} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max</p>
              <p className="font-medium">{stats.pm25.max} µg/m³</p>
            </div>
          </div>
          <div className="mt-2">
            {(() => {
              const { status, color } = getAirQualityStatus(stats.pm25.avg, 'pm25');
              return (
                <span className={`text-xs px-2 py-1 rounded ${color}`}>Average: {status}</span>
              );
            })()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            PM10
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-gray-500">Min</p>
              <p className="font-medium">{stats.pm10.min} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg</p>
              <p className="font-medium">{stats.pm10.avg} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max</p>
              <p className="font-medium">{stats.pm10.max} µg/m³</p>
            </div>
          </div>
          <div className="mt-2">
            {(() => {
              const { status, color } = getAirQualityStatus(stats.pm10.avg, 'pm10');
              return (
                <span className={`text-xs px-2 py-1 rounded ${color}`}>Average: {status}</span>
              );
            })()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
            NO₂
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-gray-500">Min</p>
              <p className="font-medium">{stats.no2.min} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg</p>
              <p className="font-medium">{stats.no2.avg} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max</p>
              <p className="font-medium">{stats.no2.max} µg/m³</p>
            </div>
          </div>
          <div className="mt-2">
            {(() => {
              const { status, color } = getAirQualityStatus(stats.no2.avg, 'no2');
              return (
                <span className={`text-xs px-2 py-1 rounded ${color}`}>Average: {status}</span>
              );
            })()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            O₃
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm text-gray-500">Min</p>
              <p className="font-medium">{stats.o3.min} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg</p>
              <p className="font-medium">{stats.o3.avg} µg/m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max</p>
              <p className="font-medium">{stats.o3.max} µg/m³</p>
            </div>
          </div>
          <div className="mt-2">
            {(() => {
              const { status, color } = getAirQualityStatus(stats.o3.avg, 'o3');
              return (
                <span className={`text-xs px-2 py-1 rounded ${color}`}>Average: {status}</span>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Location Comparison Table */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Location Comparison</h2>
          <p className="text-sm text-gray-600">
            Compare pollution levels across different monitoring locations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">PM2.5</th>
                <th className="px-4 py-3">PM10</th>
                <th className="px-4 py-3">NO₂</th>
                <th className="px-4 py-3">O₃</th>
                <th className="px-4 py-3">Overall</th>
              </tr>
            </thead>
            <tbody>
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
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{location.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getAirQualityStatus(pm25, 'pm25').color}`}
                      >
                        {pm25} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getAirQualityStatus(pm10, 'pm10').color}`}
                      >
                        {pm10} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getAirQualityStatus(no2, 'no2').color}`}
                      >
                        {no2} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getAirQualityStatus(o3, 'o3').color}`}
                      >
                        {o3} µg/m³
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${overallStatus.color}`}
                      >
                        {overallStatus.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Air Quality Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Air Quality Information</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">PM2.5 - Fine Particulate Matter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Fine particulate matter (PM2.5) are tiny particles in the air that reduce visibility
                and cause health issues. These particles are small enough to penetrate deep into the
                lungs and even enter the bloodstream.
              </p>
              <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                <li>Respiratory problems</li>
                <li>Heart disease</li>
                <li>Reduced lung function</li>
                <li>Aggravated asthma</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">PM10 - Coarse Particulate Matter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Coarse particulate matter (PM10) consists of particles that are 10 micrometers or
                less in diameter. These particles include dust, pollen, mold spores, and other
                organic and inorganic particles.
              </p>
              <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                <li>Irritation of eyes, nose, and throat</li>
                <li>Coughing and sneezing</li>
                <li>Decreased lung function</li>
                <li>Aggravated asthma symptoms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">NO₂ - Nitrogen Dioxide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nitrogen dioxide (NO₂) is a gaseous air pollutant produced primarily from combustion
                processes (vehicle engines, power plants, industrial operations). It contributes to
                the formation of ground-level ozone.
              </p>
              <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                <li>Inflammation of airways</li>
                <li>Increased susceptibility to respiratory infections</li>
                <li>Asthma exacerbation</li>
                <li>Reduced lung function</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">O₃ - Ozone</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ground-level ozone (O₃) is created by chemical reactions between oxides of nitrogen
                and volatile organic compounds. It is a major component of smog and typically peaks
                during warm summer months.
              </p>
              <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                <li>Chest pain and coughing</li>
                <li>Throat irritation</li>
                <li>Congestion and inflammation</li>
                <li>Worsening of asthma, bronchitis, and emphysema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

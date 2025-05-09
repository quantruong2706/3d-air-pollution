import React from 'react';
import { Activity, Cloud, CloudFog, Clock, Factory, Zap } from 'lucide-react';
import StatCard from './StatCard';
import { PollutionType, QualityLevel } from '@/types/3dVisualization';
import { PollutionStats } from '@/types/LocationDataTypes';

interface AirQualityOverviewProps {
  stats: PollutionStats;
  lastUpdated: string;
  overallAirQuality: {
    status: string;
    color: string;
    qualityLevel?: QualityLevel;
  };
}

const AirQualityOverview: React.FC<AirQualityOverviewProps> = ({
  stats,
  lastUpdated,
  overallAirQuality,
}) => {
  // Helper to determine air quality status
  const getAirQualityStatus = (
    value: number,
    pollutant: PollutionType
  ): {
    status: string;
    color: string;
    qualityLevel: QualityLevel;
  } => {
    // WHO guidelines
    const thresholds = {
      pm25: { good: 5, moderate: 15, poor: 25, veryPoor: 50 },
      pm10: { good: 15, moderate: 45, poor: 75, veryPoor: 100 },
      no2: { good: 10, moderate: 25, poor: 50, veryPoor: 100 },
      o3: { good: 50, moderate: 100, poor: 150, veryPoor: 200 },
    };

    const t = thresholds[pollutant];

    if (value <= t.good)
      return { status: 'Good', color: 'text-green-600 bg-green-100', qualityLevel: 'good' };
    if (value <= t.moderate)
      return {
        status: 'Moderate',
        color: 'text-yellow-600 bg-yellow-100',
        qualityLevel: 'moderate',
      };
    if (value <= t.poor)
      return { status: 'Poor', color: 'text-orange-600 bg-orange-100', qualityLevel: 'poor' };
    if (value <= t.veryPoor)
      return { status: 'Very Poor', color: 'text-red-600 bg-red-100', qualityLevel: 'veryPoor' };
    return {
      status: 'Hazardous',
      color: 'text-purple-600 bg-purple-100',
      qualityLevel: 'hazardous',
    };
  };

  // Get color class for stat cards based on air quality
  const getStatCardColorClass = (pollutant: PollutionType, value: number): string => {
    const { qualityLevel } = getAirQualityStatus(value, pollutant);

    switch (qualityLevel) {
      case 'good':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-orange-500';
      case 'veryPoor':
        return 'bg-red-500';
      case 'hazardous':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Air Quality Overview</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Overall AQI */}
        <StatCard
          title="Overall Air Quality"
          value={overallAirQuality.status}
          icon={<Activity size={20} />}
          colorClass={overallAirQuality.color}
          subtitle="Based on WHO guidelines"
        />

        {/* PM2.5 */}
        <StatCard
          title="PM2.5"
          value={`${stats.pm25.avg} µg/m³`}
          icon={<CloudFog size={20} />}
          colorClass={getStatCardColorClass('pm25', stats.pm25.avg)}
          change={{
            value: 5.3,
            isPositive: false,
          }}
        />

        {/* PM10 */}
        <StatCard
          title="PM10"
          value={`${stats.pm10.avg} µg/m³`}
          icon={<Cloud size={20} />}
          colorClass={getStatCardColorClass('pm10', stats.pm10.avg)}
          change={{
            value: 2.1,
            isPositive: true,
          }}
        />

        {/* NO2 */}
        <StatCard
          title="NO₂"
          value={`${stats.no2.avg} µg/m³`}
          icon={<Factory size={20} />}
          colorClass={getStatCardColorClass('no2', stats.no2.avg)}
          change={{
            value: 8.7,
            isPositive: false,
          }}
        />

        {/* O3 */}
        <StatCard
          title="O₃"
          value={`${stats.o3.avg} µg/m³`}
          icon={<Zap size={20} />}
          colorClass={getStatCardColorClass('o3', stats.o3.avg)}
          change={{
            value: 3.2,
            isPositive: true,
          }}
        />
      </div>
    </div>
  );
};

export default AirQualityOverview;

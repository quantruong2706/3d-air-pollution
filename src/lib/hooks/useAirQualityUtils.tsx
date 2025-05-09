import { useMemo } from 'react';
import { CloudFog, Cloud, Factory, Zap, AlertTriangle } from 'lucide-react';
import { PollutionType, QualityLevel } from '@/types/3dVisualization';

export interface PollutionStats {
  pm25: { min: number; max: number; avg: number };
  pm10: { min: number; max: number; avg: number };
  no2: { min: number; max: number; avg: number };
  o3: { min: number; max: number; avg: number };
}

export const useAirQualityUtils = (stats: PollutionStats) => {
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

  // Helper to get appropriate icon for pollutant
  const getPollutantIcon = (pollutant: PollutionType) => {
    switch (pollutant) {
      case 'pm25':
        return <CloudFog size={20} />;
      case 'pm10':
        return <Cloud size={20} />;
      case 'no2':
        return <Factory size={20} />;
      case 'o3':
        return <Zap size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
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

  // Calculate overall air quality index
  const overallAirQuality = useMemo(() => {
    if (stats.pm25.avg === 0) return { status: 'Unknown', color: 'bg-gray-500' };

    // Get quality level for each pollutant
    const pm25Status = getAirQualityStatus(stats.pm25.avg, 'pm25');
    const pm10Status = getAirQualityStatus(stats.pm10.avg, 'pm10');
    const no2Status = getAirQualityStatus(stats.no2.avg, 'no2');
    const o3Status = getAirQualityStatus(stats.o3.avg, 'o3');

    // Get worst status (very simplified approach for demo)
    const statusMap: Record<string, number> = {
      good: 1,
      moderate: 2,
      poor: 3,
      veryPoor: 4,
      hazardous: 5,
    };

    const statusValues = [
      statusMap[pm25Status.qualityLevel],
      statusMap[pm10Status.qualityLevel],
      statusMap[no2Status.qualityLevel],
      statusMap[o3Status.qualityLevel],
    ];

    const worstStatus = Math.max(...statusValues);

    // Map back to text and color
    switch (worstStatus) {
      case 1:
        return { status: 'Good', color: 'bg-green-500', qualityLevel: 'good' as const };
      case 2:
        return { status: 'Moderate', color: 'bg-yellow-500', qualityLevel: 'moderate' as const };
      case 3:
        return { status: 'Poor', color: 'bg-orange-500', qualityLevel: 'poor' as const };
      case 4:
        return { status: 'Very Poor', color: 'bg-red-500', qualityLevel: 'veryPoor' as const };
      case 5:
        return { status: 'Hazardous', color: 'bg-purple-500', qualityLevel: 'hazardous' as const };
      default:
        return { status: 'Unknown', color: 'bg-gray-500', qualityLevel: 'moderate' as const };
    }
  }, [stats]);

  return {
    getAirQualityStatus,
    getPollutantIcon,
    getStatCardColorClass,
    overallAirQuality,
  };
};

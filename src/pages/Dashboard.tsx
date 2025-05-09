import React, { useEffect, useState, useMemo } from 'react';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import Logger from '@/lib/logger';
import { AlertTriangle } from 'lucide-react';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import { useAirQualityUtils } from '@/lib/hooks/useAirQualityUtils';
import { LocationData, PollutionStats, ChartDataPoint } from '@/types/LocationDataTypes';

// Components
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DashboardLayout from '@/components/features/dashboard/DashboardLayout';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';

// Dashboard Sections
import AirQualityOverview from '@/components/features/dashboard/AirQualityOverview';
import ChartSection from '@/components/features/dashboard/ChartSection';
import LocationComparison from '@/components/features/dashboard/LocationComparison';
import AirQualityInfo from '@/components/features/dashboard/AirQualityInfo';
import HealthImpact from '@/components/features/dashboard/HealthImpact';

const Dashboard: React.FC = () => {
  const { pollutionData, isLoading, error, fetchPollutionData } = usePollutionStore();
  const [stats, setStats] = useState<PollutionStats>({
    pm25: { min: 0, max: 0, avg: 0 },
    pm10: { min: 0, max: 0, avg: 0 },
    no2: { min: 0, max: 0, avg: 0 },
    o3: { min: 0, max: 0, avg: 0 },
  });

  const [locationData, setLocationData] = useState<LocationData[]>([]);

  // Get air quality utility functions
  const { getAirQualityStatus, getPollutantIcon, overallAirQuality } = useAirQualityUtils(stats);

  // Animation for content sections
  const { animationStyles: contentAnimationStyles } = useAnimateIn({
    direction: 'bottom',
    duration: 600,
    delay: 100,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  });

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

  // Prepare data for PieChart3D - Pollution Source Distribution
  const pollutionSourceData = useMemo<ChartDataPoint[]>(() => {
    return [
      { value: 45, label: 'Transportation', color: '#38bdf8' },
      { value: 25, label: 'Industry', color: '#fb923c' },
      { value: 15, label: 'Residential', color: '#4ade80' },
      { value: 10, label: 'Agriculture', color: '#a855f7' },
      { value: 5, label: 'Other', color: '#f43f5e' },
    ];
  }, []);

  // Prepare monthly pollution data for BarChart3D
  const monthlyPollutionData = useMemo<ChartDataPoint[]>(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

    return months.map((month, index) => {
      const fluctuationFactors = [0.9, 1.1, 0.95, 1.05, 1];
      const value =
        stats.pm25.avg * fluctuationFactors[index] +
        stats.pm10.avg * fluctuationFactors[(index + 1) % 5] * 0.3 +
        stats.no2.avg * fluctuationFactors[(index + 2) % 5] * 0.2;

      let color = '#4ade80'; // Good (green)
      if (value > 50) color = '#facc15'; // Moderate (yellow)
      if (value > 100) color = '#fb923c'; // Poor (orange)
      if (value > 150) color = '#ef4444'; // Very poor (red)
      if (value > 200) color = '#a855f7'; // Hazardous (purple)

      return {
        label: month,
        value: Number(value.toFixed(1)),
        color,
      };
    });
  }, [stats.pm25.avg, stats.pm10.avg, stats.no2.avg]);

  const lastUpdated = useMemo(() => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <LoadingSpinner text="Loading dashboard data..." size="medium" variant="dark" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="p-4 bg-red-100 text-red-700 rounded flex items-center gap-2">
            <AlertTriangle size={20} />
            <span>Error: {error}</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Air Quality Dashboard"
        subtitle="Monitor and analyze air pollution data across monitoring stations"
      />

      <div className="p-6" style={contentAnimationStyles}>
        {/* Quick Stats Summary */}
        <AirQualityOverview
          stats={stats}
          lastUpdated={lastUpdated}
          overallAirQuality={overallAirQuality}
        />

        {/* Charts Section */}
        <ChartSection
          pollutionSourceData={pollutionSourceData}
          monthlyPollutionData={monthlyPollutionData}
        />

        {/* Location Comparison Table */}
        <LocationComparison
          locationData={locationData}
          getAirQualityStatus={getAirQualityStatus}
          getPollutantIcon={getPollutantIcon}
        />

        {/* Air Quality Information */}
        <AirQualityInfo />

        {/* Health Impact Section */}
        <HealthImpact />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

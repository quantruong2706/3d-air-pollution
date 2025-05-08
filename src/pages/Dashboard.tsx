import React, { useEffect, useState, useMemo } from 'react';
import { usePollutionStore } from '@/stores/pollutionDataStore';
import Logger from '@/lib/logger';
import { PollutionType, QualityLevel } from '@/types/3dVisualization';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  Cloud,
  Factory,
  Activity,
  AlertTriangle,
  MapPin,
  Info,
  CloudFog,
  Gauge,
  Users,
  Car,
  Building,
  Zap,
  ChartPie,
  BarChart,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { useAnimateIn } from '@/lib/hooks/useAnimateIn';
import PollutionVisualizationScene from '@/components/features/dashboard/PollutionVisualizationScene';
import PieChart3D from '@/components/features/dashboard/PieChart3D';
import BarChart3D from '@/components/features/dashboard/BarChart3D';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DashboardLayout from '@/components/features/dashboard/DashboardLayout';
import DashboardHeader from '@/components/features/dashboard/DashboardHeader';
import DashboardCard from '@/components/features/dashboard/DashboardCard';
import StatCard from '@/components/features/dashboard/StatCard';

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

  // Prepare data for PieChart3D - Pollution Source Distribution
  const pollutionSourceData = useMemo(() => {
    return [
      { value: 45, label: 'Transportation', color: '#38bdf8' },
      { value: 25, label: 'Industry', color: '#fb923c' },
      { value: 15, label: 'Residential', color: '#4ade80' },
      { value: 10, label: 'Agriculture', color: '#a855f7' },
      { value: 5, label: 'Other', color: '#f43f5e' },
    ];
  }, []);

  // Prepare monthly pollution data for BarChart3D
  const monthlyPollutionData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

    return months.map((month, index) => {
      // Generate slightly varied data based on the average for each month
      // In a real app, this would come from actual historical data
      const fluctuationFactors = [0.9, 1.1, 0.95, 1.05, 1];
      const value =
        stats.pm25.avg * fluctuationFactors[index] +
        stats.pm10.avg * fluctuationFactors[(index + 1) % 5] * 0.3 +
        stats.no2.avg * fluctuationFactors[(index + 2) % 5] * 0.2;

      // Color based on the AQI value
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

  // Get mock date for last update
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

        {/* 3D Visualization Section */}
        <div className="mb-6">
          <DashboardCard
            title="Real-time Pollution Visualization"
            icon={<Gauge size={18} />}
            accentColor="purple"
            headerRightContent={
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Info size={16} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Interactive 3D visualization showing current pollutant levels.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PollutionVisualizationScene
                pollutionType="pm25"
                pollutionValue={stats.pm25.avg}
                quality={getAirQualityStatus(stats.pm25.avg, 'pm25').qualityLevel}
                height={240}
              />
              <PollutionVisualizationScene
                pollutionType="pm10"
                pollutionValue={stats.pm10.avg}
                quality={getAirQualityStatus(stats.pm10.avg, 'pm10').qualityLevel}
                height={240}
              />
              <PollutionVisualizationScene
                pollutionType="no2"
                pollutionValue={stats.no2.avg}
                quality={getAirQualityStatus(stats.no2.avg, 'no2').qualityLevel}
                height={240}
              />
              <PollutionVisualizationScene
                pollutionType="o3"
                pollutionValue={stats.o3.avg}
                quality={getAirQualityStatus(stats.o3.avg, 'o3').qualityLevel}
                height={240}
              />
            </div>
          </DashboardCard>
        </div>

        {/* Advanced Analytics Section */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Card */}
          <DashboardCard
            title="Pollution Sources"
            icon={<ChartPie size={18} />}
            accentColor="blue"
            noPadding
            headerRightContent={
              <button className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                <span>View details</span>
                <ArrowUpRight size={14} className="ml-1" />
              </button>
            }
          >
            <PieChart3D
              data={pollutionSourceData}
              title="Estimated Pollution Source Distribution"
              height={340}
              radius={1.8}
              depth={0.4}
            />
          </DashboardCard>

          {/* Bar Chart Card */}
          <DashboardCard
            title="Monthly Pollution Levels"
            icon={<BarChart size={18} />}
            accentColor="purple"
            noPadding
            headerRightContent={
              <button className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center">
                <span>View details</span>
                <ArrowUpRight size={14} className="ml-1" />
              </button>
            }
          >
            <BarChart3D data={monthlyPollutionData} title="Monthly Pollution Levels" height={340} />
          </DashboardCard>
        </div>

        {/* Location Comparison Table */}
        <div className="mb-6">
          <DashboardCard
            title="Location Comparison"
            icon={<MapPin size={18} />}
            accentColor="indigo"
            noPadding
            headerRightContent={
              <span className="text-sm text-gray-500">
                {locationData.length} monitoring stations
              </span>
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

        {/* Air Quality Information */}
        <div className="mb-6">
          <DashboardCard
            title="Air Quality Information"
            icon={<Info size={18} />}
            accentColor="green"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="bg-green-100 p-2 rounded-lg h-fit">
                  <CloudFog className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">PM2.5 - Fine Particulate Matter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Fine particulate matter (PM2.5) are tiny particles in the air that reduce
                    visibility and cause health issues. These particles are small enough to
                    penetrate deep into the lungs and even enter the bloodstream.
                  </p>
                  <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <li>Respiratory problems</li>
                    <li>Heart disease</li>
                    <li>Reduced lung function</li>
                    <li>Aggravated asthma</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-lg h-fit">
                  <Cloud className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">PM10 - Coarse Particulate Matter</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Coarse particulate matter (PM10) consists of particles that are 10 micrometers
                    or less in diameter. These particles include dust, pollen, mold spores, and
                    other organic and inorganic particles.
                  </p>
                  <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <li>Irritation of eyes, nose, and throat</li>
                    <li>Coughing and sneezing</li>
                    <li>Decreased lung function</li>
                    <li>Aggravated asthma symptoms</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-orange-100 p-2 rounded-lg h-fit">
                  <Factory className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">NO₂ - Nitrogen Dioxide</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Nitrogen dioxide (NO₂) is a gaseous air pollutant produced primarily from
                    combustion processes (vehicle engines, power plants, industrial operations). It
                    contributes to the formation of ground-level ozone.
                  </p>
                  <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <li>Inflammation of airways</li>
                    <li>Increased susceptibility to respiratory infections</li>
                    <li>Asthma exacerbation</li>
                    <li>Reduced lung function</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-purple-100 p-2 rounded-lg h-fit">
                  <Zap className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">O₃ - Ozone</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Ground-level ozone (O₃) is created by chemical reactions between oxides of
                    nitrogen and volatile organic compounds. It is a major component of smog and
                    typically peaks during warm summer months.
                  </p>
                  <h4 className="font-medium text-sm mb-1">Health Effects:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <li>Chest pain and coughing</li>
                    <li>Throat irritation</li>
                    <li>Congestion and inflammation</li>
                    <li>Worsening of asthma, bronchitis, and emphysema</li>
                  </ul>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Health Impact Section */}
        <div>
          <DashboardCard
            title="Air Quality and Health"
            icon={<Users size={18} />}
            accentColor="indigo"
            className="bg-gradient-to-br from-indigo-50/50 via-transparent to-pink-50/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Car className="text-blue-500 mb-2" size={28} />
                <h3 className="text-lg font-medium mb-2">Sources of Pollution</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Major pollution sources include vehicle emissions, industrial processes, power
                  plants, and agricultural activities.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Building className="text-green-500 mb-2" size={28} />
                <h3 className="text-lg font-medium mb-2">Urban Impact</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Urban areas typically experience higher pollution levels due to traffic
                  concentration, industrial activities, and population density.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Activity className="text-red-500 mb-2" size={28} />
                <h3 className="text-lg font-medium mb-2">Protection Measures</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  On high pollution days, limit outdoor activities, use air purifiers, and wear
                  masks when necessary to reduce exposure.
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

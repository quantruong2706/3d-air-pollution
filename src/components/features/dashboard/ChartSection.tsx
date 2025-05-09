import React from 'react';
import { ChartPie, BarChart, ArrowUpRight } from 'lucide-react';
import DashboardCard from './DashboardCard';
import PieChart3D from './PieChart3D';
import BarChart3D from './BarChart3D';

interface ChartSectionProps {
  pollutionSourceData: Array<{
    value: number;
    label: string;
    color: string;
  }>;
  monthlyPollutionData: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  pollutionSourceData,
  monthlyPollutionData,
}) => {
  return (
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
  );
};

export default ChartSection;

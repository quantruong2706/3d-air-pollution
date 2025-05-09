import React from 'react';
import { Users, Car, Building, Activity } from 'lucide-react';
import DashboardCard from './DashboardCard';

const HealthImpact: React.FC = () => {
  return (
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
              Major pollution sources include vehicle emissions, industrial processes, power plants,
              and agricultural activities.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Building className="text-green-500 mb-2" size={28} />
            <h3 className="text-lg font-medium mb-2">Urban Impact</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Urban areas typically experience higher pollution levels due to traffic concentration,
              industrial activities, and population density.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Activity className="text-red-500 mb-2" size={28} />
            <h3 className="text-lg font-medium mb-2">Protection Measures</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              On high pollution days, limit outdoor activities, use air purifiers, and wear masks
              when necessary to reduce exposure.
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default HealthImpact;

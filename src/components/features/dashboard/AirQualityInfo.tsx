import React from 'react';
import { Info, CloudFog, Cloud, Factory, Zap } from 'lucide-react';
import DashboardCard from './DashboardCard';

const AirQualityInfo: React.FC = () => {
  return (
    <div className="mb-6">
      <DashboardCard title="Air Quality Information" icon={<Info size={18} />} accentColor="green">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div className="bg-green-100 p-2 rounded-lg h-fit">
              <CloudFog className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">PM2.5 - Fine Particulate Matter</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Fine particulate matter (PM2.5) are tiny particles in the air that reduce visibility
                and cause health issues. These particles are small enough to penetrate deep into the
                lungs and even enter the bloodstream.
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
                Coarse particulate matter (PM10) consists of particles that are 10 micrometers or
                less in diameter. These particles include dust, pollen, mold spores, and other
                organic and inorganic particles.
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
                Nitrogen dioxide (NO₂) is a gaseous air pollutant produced primarily from combustion
                processes (vehicle engines, power plants, industrial operations). It contributes to
                the formation of ground-level ozone.
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
                Ground-level ozone (O₃) is created by chemical reactions between oxides of nitrogen
                and volatile organic compounds. It is a major component of smog and typically peaks
                during warm summer months.
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
  );
};

export default AirQualityInfo;

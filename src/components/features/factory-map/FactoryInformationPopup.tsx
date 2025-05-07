import React from 'react';
import { Building2, MapPin, Phone, AlertTriangle, Users, Wind } from 'lucide-react';
import { pollutionTypes } from '@/constants/aqi';
import { IFactoryItem } from '@/types/MapBoxTypes';

interface AirQualityLevel {
  readonly label: string;
  readonly color: string;
  readonly description: string;
}

const AIR_QUALITY_LEVELS: Readonly<Record<string, AirQualityLevel>> = {
  available: {
    label: 'Low Pollution',
    color: '#38a169',
    description: 'Air quality is acceptable',
  },
  full: {
    label: 'High Pollution',
    color: '#e53e3e',
    description: 'Air quality is hazardous',
  },
};

const DEFAULT_AIR_QUALITY: AirQualityLevel = {
  label: 'Unknown',
  color: '#718096',
  description: 'Air quality information unavailable',
};

interface FactoryInformationPopupProps {
  readonly factory: IFactoryItem | null;
  readonly x: number;
  readonly y: number;
}

const FactoryInformationPopup: React.FC<FactoryInformationPopupProps> = ({ factory, x, y }) => {
  if (!factory) return null;

  const pollutionSeed = factory.id.charCodeAt(0) + factory.id.charCodeAt(factory.id.length - 1);
  const emissionLevel = (pollutionSeed % 65) + 35;
  const pollutionIndex = pollutionSeed % pollutionTypes.length;
  const pollutionLabel = pollutionTypes[pollutionIndex]?.label ?? 'Unknown';

  const airQualityInfo = AIR_QUALITY_LEVELS[factory.status] ?? DEFAULT_AIR_QUALITY;

  return (
    <div
      className="absolute z-10 bg-white p-4 rounded-lg shadow-lg border-l-4"
      style={{
        left: x + 10,
        top: y + 10,
        pointerEvents: 'none',
        borderLeftColor: airQualityInfo.color,
        maxWidth: '300px',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="text-blue-600 shrink-0" size={20} />
        <h3 className="text-lg font-bold text-gray-800">{factory.name}</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="text-gray-500 shrink-0 mt-0.5" size={16} />
          <span className="text-gray-700">{factory.address}</span>
        </div>

        {factory.phone && (
          <div className="flex items-center gap-2">
            <Phone className="text-gray-500 shrink-0" size={16} />
            <span className="text-gray-700">{factory.phone}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Wind className="shrink-0" size={16} style={{ color: airQualityInfo.color }} />
          <div>
            <span className="font-medium" style={{ color: airQualityInfo.color }}>
              {pollutionLabel} Emission: {emissionLevel}μg/m³
            </span>
            <span className="block text-xs text-gray-500">{airQualityInfo.description}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle className="shrink-0" size={16} style={{ color: airQualityInfo.color }} />
          <span className="font-medium" style={{ color: airQualityInfo.color }}>
            {airQualityInfo.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="text-blue-600 shrink-0" size={16} />
          <span className="text-gray-700">
            Factory capacity: <span className="font-medium">{factory.patients}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FactoryInformationPopup;

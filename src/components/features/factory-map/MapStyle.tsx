import { MAPBOX_STYLES } from '@/types/MapBoxTypes';

interface MapStyleProps {
  currentMapStyle: keyof typeof MAPBOX_STYLES;
  onStyleChange: (style: keyof typeof MAPBOX_STYLES) => void;
}

const MapStyle: React.FC<MapStyleProps> = ({ currentMapStyle, onStyleChange }) => {
  return (
    <div className="absolute bottom-1 right-1 z-10 bg-white p-3 rounded-md shadow-md">
      <h3 className="text-primary font-bold text-sm mb-2">Map Style</h3>
      <div className="grid grid-cols-4 gap-2">
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            currentMapStyle === 'STREETS'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onStyleChange('STREETS')}
        >
          Streets
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            currentMapStyle === 'SATELLITE'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onStyleChange('SATELLITE')}
        >
          Satellite
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            currentMapStyle === 'LIGHT'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onStyleChange('LIGHT')}
        >
          Light
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${
            currentMapStyle === 'DARK'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onStyleChange('DARK')}
        >
          Dark
        </button>
      </div>
    </div>
  );
};

export default MapStyle;

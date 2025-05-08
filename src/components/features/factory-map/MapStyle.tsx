import { MAP_STYLE_TYPES, MapStyleType } from '@/constants/mapStyles';
import { getButtonStyleClass } from '@/utils/mapHelpers';

interface MapStyleProps {
  currentMapStyle: MapStyleType;
  onStyleChange: (style: MapStyleType) => void;
}

const MapStyle: React.FC<MapStyleProps> = ({ currentMapStyle, onStyleChange }) => {
  return (
    <div className="absolute bottom-1 right-1 z-10 bg-white p-3 rounded-md shadow-md">
      <h3 className="text-primary font-bold text-sm mb-2 text-center">Map Style</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentMapStyle === MAP_STYLE_TYPES.STREETS
          )}`}
          onClick={() => onStyleChange(MAP_STYLE_TYPES.STREETS)}
        >
          Streets
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentMapStyle === MAP_STYLE_TYPES.SATELLITE
          )}`}
          onClick={() => onStyleChange(MAP_STYLE_TYPES.SATELLITE)}
        >
          Satellite
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentMapStyle === MAP_STYLE_TYPES.LIGHT
          )}`}
          onClick={() => onStyleChange(MAP_STYLE_TYPES.LIGHT)}
        >
          Light
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentMapStyle === MAP_STYLE_TYPES.DARK
          )}`}
          onClick={() => onStyleChange(MAP_STYLE_TYPES.DARK)}
        >
          Dark
        </button>
      </div>
    </div>
  );
};

export default MapStyle;

import { PREDEFINED_VIEWS } from '@/constants/factory';
import React from 'react';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface ViewingAnglesMapProps {
  onChangeView: (view: Partial<ViewState>) => void;
}

const ViewingAnglesMap: React.FC<ViewingAnglesMapProps> = ({ onChangeView }) => {
  return (
    <div className="absolute bottom-1 left-1 z-10 bg-white p-3 rounded-md shadow-md">
      <h3 className="text-primary font-bold text-sm mb-2">Viewing angles of the map</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          onClick={() => onChangeView(PREDEFINED_VIEWS.topDown)}
        >
          Upward
        </button>
        <button
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          onClick={() => onChangeView(PREDEFINED_VIEWS.isometric)}
        >
          Perspective
        </button>
        <button
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          onClick={() => onChangeView(PREDEFINED_VIEWS.side)}
        >
          Tilting angle
        </button>
        <button
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          onClick={() => onChangeView(PREDEFINED_VIEWS.bird)}
        >
          Bird's eye view
        </button>
      </div>
    </div>
  );
};

export default ViewingAnglesMap;

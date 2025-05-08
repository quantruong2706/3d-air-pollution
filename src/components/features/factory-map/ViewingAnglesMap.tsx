import { PREDEFINED_VIEWS } from '@/constants/factory';
import { VIEW_TYPES, ViewType } from '@/constants/viewTypes';
import { getButtonStyleClass } from '@/utils/mapHelpers';
import React from 'react';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface ViewingAnglesMapProps {
  onChangeView: (view: Partial<ViewState>, viewType?: ViewType) => void;
  currentView?: ViewType;
}

const ViewingAnglesMap: React.FC<ViewingAnglesMapProps> = ({ onChangeView, currentView }) => {
  return (
    <div className="absolute bottom-1 left-1 z-10 bg-white p-3 rounded-md shadow-md">
      <h3 className="text-primary font-bold text-sm mb-2 text-center">Viewing angles of the map</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentView === VIEW_TYPES.TOP_DOWN
          )}`}
          onClick={() => onChangeView(PREDEFINED_VIEWS[VIEW_TYPES.TOP_DOWN], VIEW_TYPES.TOP_DOWN)}
        >
          Upward
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentView === VIEW_TYPES.ISOMETRIC
          )}`}
          onClick={() => onChangeView(PREDEFINED_VIEWS[VIEW_TYPES.ISOMETRIC], VIEW_TYPES.ISOMETRIC)}
        >
          Perspective
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentView === VIEW_TYPES.SIDE
          )}`}
          onClick={() => onChangeView(PREDEFINED_VIEWS[VIEW_TYPES.SIDE], VIEW_TYPES.SIDE)}
        >
          Tilting angle
        </button>
        <button
          className={`px-3 py-1 text-xs rounded transition-colors ${getButtonStyleClass(
            currentView === VIEW_TYPES.BIRD
          )}`}
          onClick={() => onChangeView(PREDEFINED_VIEWS[VIEW_TYPES.BIRD], VIEW_TYPES.BIRD)}
        >
          Bird's eye view
        </button>
      </div>
    </div>
  );
};

export default ViewingAnglesMap;

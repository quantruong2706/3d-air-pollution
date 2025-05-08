import React from 'react';
import Map, { GeolocateControl, NavigationControl } from 'react-map-gl/mapbox';
import { env } from '@/lib/env';
import { MAPBOX_STYLES } from '@/constants/mapStyles';
import DeckGLOverlay from '@/components/features/factory-map/DeckGLOverlay';
import FactoryInformationPopup from '@/components/features/factory-map/FactoryInformationPopup';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MapStyle from '@/components/features/factory-map/MapStyle';
import ViewingAnglesMap from '@/components/features/factory-map/ViewingAnglesMap';
import { useFactoryMap } from '@/lib/hooks/useFactoryMap';
import { INITIAL_VIEW_STATE } from '@/constants/factory';

const MapBoxFactory: React.FC = () => {
  const {
    modelLoaded,
    hoverInfo,
    currentMapStyle,
    currentView,
    lightingEffect,
    handleMapLoad,
    handleViewStateChange,
    setProgrammaticViewChange,
    changeMapStyle,
    setupGeocoder,
    setup3DBuildings,
    createBuildingLayers,
  } = useFactoryMap();

  return (
    <div className="h-[92vh] w-full relative">
      <ViewingAnglesMap
        onChangeView={(view, viewType) => setProgrammaticViewChange(view, viewType)}
        currentView={currentView}
      />

      <Map
        mapboxAccessToken={env.MAP_BOX_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAPBOX_STYLES[currentMapStyle]}
        antialias={true}
        onMove={evt => handleViewStateChange(evt.viewState)}
        onLoad={event => {
          const map = event.target;
          setupGeocoder(map);
          setup3DBuildings(map);
          handleMapLoad(event);
        }}
      >
        <DeckGLOverlay layers={createBuildingLayers()} effects={[lightingEffect]} controller />
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />
      </Map>

      <MapStyle currentMapStyle={currentMapStyle} onStyleChange={changeMapStyle} />

      {!modelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <LoadingSpinner text="Loading 3D Factory model..." size="large" variant="light" />
        </div>
      )}

      {hoverInfo && (
        <FactoryInformationPopup factory={hoverInfo.factory} x={hoverInfo.x} y={hoverInfo.y} />
      )}
    </div>
  );
};

export default MapBoxFactory;

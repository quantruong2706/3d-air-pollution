import { useRef, useState, useCallback } from 'react';
import { env } from '@/lib/env';
import { IFactoryItem } from '@/types/MapBoxTypes';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { ListFactoryModels } from '@/lib/db/factoryData';
import { AmbientLight, LightingEffect, _SunLight as SunLight } from '@deck.gl/core';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { INITIAL_VIEW_STATE, PREDEFINED_VIEWS } from '@/constants/factory';
import { VIEW_TYPES, ViewType } from '@/constants/viewTypes';
import { MAP_STYLE_TYPES, MapStyleType, MAPBOX_STYLES } from '@/constants/mapStyles';

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface HoverInfo {
  x: number;
  y: number;
  factory: IFactoryItem | null;
}

interface UseFactoryMapReturn {
  mapRef: React.RefObject<mapboxgl.Map | null>;
  modelLoaded: boolean;
  hoverInfo: HoverInfo | null;
  viewState: ViewState;
  currentMapStyle: MapStyleType;
  currentView: ViewType | undefined;
  lightingEffect: LightingEffect;
  handleMapLoad: (event: { target: mapboxgl.Map }) => void;
  handleViewStateChange: (newViewState: ViewState) => void;
  setProgrammaticViewChange: (view: Partial<ViewState>, viewType?: ViewType) => void;
  changeMapStyle: (styleKey: MapStyleType) => void;
  setupGeocoder: (map: mapboxgl.Map) => void;
  setup3DBuildings: (map: mapboxgl.Map) => void;
  createBuildingLayers: () => ScenegraphLayer<IFactoryItem>[];
}

export const useFactoryMap = (): UseFactoryMapReturn => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [viewState, setViewState] = useState<ViewState>({
    ...INITIAL_VIEW_STATE,
    ...PREDEFINED_VIEWS[VIEW_TYPES.BIRD],
  });
  const [currentMapStyle, setCurrentMapStyle] = useState<MapStyleType>(MAP_STYLE_TYPES.STREETS);
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.BIRD);

  const sun = new SunLight({
    timestamp: Date.now(),
    color: [255, 255, 255],
    intensity: 1.0,
  });

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1,
  });

  const lightingEffect = new LightingEffect({ sun, ambientLight });

  const handleMapLoad = useCallback((event: { target: mapboxgl.Map }) => {
    mapRef.current = event.target;
    setModelLoaded(true);
  }, []);

  const handleViewStateChange = useCallback((newViewState: ViewState) => {
    setViewState(newViewState);
  }, []);

  const setProgrammaticViewChange = useCallback(
    (view: Partial<ViewState>, viewType?: ViewType) => {
      if (mapRef.current) {
        mapRef.current.easeTo({
          pitch: view.pitch ?? viewState.pitch,
          bearing: view.bearing ?? viewState.bearing,
          zoom: view.zoom ?? viewState.zoom,
          duration: 1000,
        });

        if (viewType) {
          setCurrentView(viewType);
        } else if (view === PREDEFINED_VIEWS[VIEW_TYPES.TOP_DOWN]) {
          setCurrentView(VIEW_TYPES.TOP_DOWN);
        } else if (view === PREDEFINED_VIEWS[VIEW_TYPES.ISOMETRIC]) {
          setCurrentView(VIEW_TYPES.ISOMETRIC);
        } else if (view === PREDEFINED_VIEWS[VIEW_TYPES.SIDE]) {
          setCurrentView(VIEW_TYPES.SIDE);
        } else if (view === PREDEFINED_VIEWS[VIEW_TYPES.BIRD]) {
          setCurrentView(VIEW_TYPES.BIRD);
        }
      }
    },
    [viewState]
  );

  const changeMapStyle = useCallback((styleKey: MapStyleType) => {
    setCurrentMapStyle(styleKey);
    if (mapRef.current) {
      mapRef.current.setStyle(MAPBOX_STYLES[styleKey]);
    }
  }, []);

  const setupGeocoder = useCallback((map: mapboxgl.Map) => {
    const geocoder = new MapboxGeocoder({
      accessToken: env.MAP_BOX_TOKEN,
      mapboxgl: mapboxgl as never,
      language: 'en',
      placeholder: 'Search for a location',
      types: 'place,locality,neighborhood',
      marker: false,
      flyTo: {
        zoom: 16,
        speed: 3,
        curve: 1,
        easing: (t: number) => t,
      },
    });
    map.addControl(geocoder, 'top-left');
  }, []);

  const setup3DBuildings = useCallback((map: mapboxgl.Map) => {
    map.addLayer({
      id: '3d-buildings',
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 15,
      paint: {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height'],
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height'],
        ],
        'fill-extrusion-opacity': 0.6,
      },
    });
  }, []);

  const createBuildingLayers = useCallback(() => {
    return ListFactoryModels.map(
      factory =>
        new ScenegraphLayer({
          id: `factory-layer-${factory.id}`,
          data: [factory],
          scenegraph: factory.modelPath,
          getPosition: d => d.coordinates,
          getOrientation: [0, 0, 90],
          sizeScale: (factory.scale ?? 1) * 0.2,
          pickable: true,
          onHover: info => {
            if (info.object) {
              setHoverInfo({
                x: info.x,
                y: info.y,
                factory: factory,
              });
            } else {
              setHoverInfo(null);
            }
          },
        })
    );
  }, []);

  return {
    mapRef,
    modelLoaded,
    hoverInfo,
    viewState,
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
  };
};

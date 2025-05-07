import React from 'react';
import { useControl } from 'react-map-gl/mapbox';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { Layer, Effect } from '@deck.gl/core';

interface DeckGLOverlayProps {
  layers: (Layer<object> | null | undefined)[];
  effects: Effect[];
  controller: boolean;
}

export const DeckGLOverlay: React.FC<DeckGLOverlayProps> = props => {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

export default DeckGLOverlay;

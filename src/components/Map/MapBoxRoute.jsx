import React from 'react';
import { Layer,Source } from "react-map-gl";

const MapBoxRoute = ({coordinates}) => {
  return (
    <Source type="geojson" data={{ type: 'Feature', geometry: { type: 'LineString', coordinates: coordinates } }}>
        <Layer type="line" layout={{ 'line-join': 'round', 'line-cap': 'square' }} paint={{ 'line-color': '#0462d4', 'line-width': 5 }} />
      </Source>
  )
}

export default MapBoxRoute


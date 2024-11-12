import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import './Map.scss';

interface MapProps {
  center: LatLngTuple;
  location?: string;
}

export const Map: React.FC<MapProps> = ({ 
  center, 
  location = 'My Location' 
}) => {
  return (
    <div data-component="Map">
      {/* TODO: Implement map */}
    </div>
  );
};

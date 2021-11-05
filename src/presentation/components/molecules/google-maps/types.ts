import MapSettings from '../../../../domain/models/map-settings';

export interface GoogleMapsProps {
  center?: google.maps.LatLngLiteral,
  updateMapSettings: (newMapSettings: MapSettings) => void,
}

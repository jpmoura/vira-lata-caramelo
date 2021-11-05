import MapSettings from './map-settings';

export default interface AppSettings {
  rentalMaxValue?: number;
  rooms?: number;
  map?: MapSettings;
}

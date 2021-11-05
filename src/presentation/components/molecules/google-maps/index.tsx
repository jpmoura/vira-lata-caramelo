import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Skeleton } from '@mui/material';
import { GoogleMapsProps } from './types';
import CoordinateBox from '../../../../domain/models/coordinate-box';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function GoogleMaps({ center, updateMapSettings: updateCoordinates }: GoogleMapsProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
  });
  const mapRef = useRef<google.maps.Map>(null);
  const [shouldCenter, setShouldCenter] = useState<boolean>(false);

  const onLoad = React.useCallback(function callback(loadedMap: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    loadedMap.fitBounds(bounds);
    mapRef.current = loadedMap;
    setShouldCenter(true);
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const onDragEnd = useCallback(function callback() {
    const coordinates = mapRef.current?.getBounds().toJSON() as CoordinateBox;
    const zoom =  mapRef.current?.getZoom();
    updateCoordinates({
      coordinates: coordinates,
      zoom,
    });
  }, []);

  const onIdle = useCallback(function callback() {
    if (shouldCenter) {
      mapRef?.current?.setCenter(center);
      mapRef?.current?.setZoom(14);
      setShouldCenter(false);
    }
  }, [shouldCenter]);

  console.log('CENTER', center);

  return isLoaded ?
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={onDragEnd}
        onIdle={onIdle}
      /> : <Skeleton sx={containerStyle} />;
}

GoogleMaps.defaultProps = {
  center: { // Belo Horizonte, MG, Brazil
    lat: -19.9191,
    lng: -43.9387,
  } as google.maps.LatLngLiteral,
};
export default React.memo(GoogleMaps);

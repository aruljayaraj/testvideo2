import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface Props { 
    lat: string,
    lng: string
}

const ContactMap: React.FC<Props> = ({ lat, lng } ) => {
  const center = {
    lat: +(lat),
    lng: +(lng)
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCHlO8Xjl6IS9YOcCWgsgFjkWmiNr77xjM"
  })

  const [map, setMap] = React.useState(null)

  const containerStyle = {
    width: '100%',
    height: '200px'
  };

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new (window as any).google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <>
        { (lat && lng) && isLoaded &&
          <GoogleMap
           mapContainerStyle={containerStyle}
           center={center}
           zoom={10}
           onLoad={onLoad}
           onUnmount={onUnmount}
          >
            <Marker
                onLoad={onLoad}
                position={center}
            />
          </GoogleMap>
        }
    </>
  )
}
 
export default ContactMap;
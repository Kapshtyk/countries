import React, { useEffect, useRef } from 'react'

import { Wrapper } from "@googlemaps/react-wrapper";


const apiKey =
  process.env.REACT_APP_ENV === 'test'
    ? ''
    : process.env.REACT_APP_GOOGLE_API_KEY ?? ''

import { Country } from '@/lib/zod/countries';

interface IMapComponent {
  country: Country
}

const MapComponent = ({ country }: IMapComponent) => {
  switch (country.capitalInfo?.latlng?.length) {
    case 2:
      return (
        <Wrapper apiKey={apiKey}>
          <MapContainer center={{ lat: country.capitalInfo.latlng[0], lng: country.capitalInfo.latlng[1] }} zoom={12} />
        </Wrapper>
      )
    default:
      return null
  }
}

const MapContainer = ({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
        controlSize: 20,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },

      });
    }
  }, [center, zoom]);

  return <div ref={ref} id="map" className="h-full rounded-md" />;
}


export default MapComponent
import { ReactNode } from "react";

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface Address {
  countryCode: string;
}

export interface Distance {
  value: number;
  unit: string;
}

export interface Hotel {
  lastUpdate: ReactNode;
  amenities: any;
  rating: any;
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: GeoCode;
  address: Address;
  distance: Distance;
}

export interface Meta {
  count: number;
  links: {
    self: string;
  };
}

export interface HotelResponse {
  data: Hotel[];
  meta: Meta;
}

export default HotelResponse;

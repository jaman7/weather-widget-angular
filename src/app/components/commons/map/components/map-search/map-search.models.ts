export interface ISearchData {
  id?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  displayName?: string;
}

export interface IMapboxGeometry {
  type: string;
  coordinates: [number, number];
}

export interface IMapboxProperties {
  name?: string;
  full_address?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  [key: string]: unknown;
}

export interface IMapboxFeature {
  id: string;
  type: string;
  geometry: IMapboxGeometry;
  properties: IMapboxProperties;
}

export interface IMapboxResponse {
  type: string;
  features: IMapboxFeature[];
}

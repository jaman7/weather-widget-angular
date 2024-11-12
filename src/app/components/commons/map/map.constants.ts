import { fromLonLat } from 'ol/proj';
import { TypeEPSG } from './map.enums';

const { EPSG3857 } = TypeEPSG;

export const API_URL = 'https://api.openweathermap.org/data/2.5';

export const API_KEY = '33e67a9b2d05b12d29b27e39b1d4719a';

export const MAPBOX_API_KEY = 'pk.eyJ1IjoiamFtYW43IiwiYSI6ImNqbmV0bTFrczBrZG8zcm80Y2h4ZGF1ajQifQ.8aCc8P2-eq4hqman9k0E7g';

export const ViewOptions = {
  center: fromLonLat([-73.935242, 40.73061]),
  zoom: 7,
  smoothResolutionConstraint: false,
  constrainResolution: true,
  showFullExtent: true,
  projection: EPSG3857,
  pixelRatio: 1,
};

export const MapConsts = {
  targetClassName: 'ol-map',
  paddingOfCenterCluster: { padding: [30, 30, 30, 30] },
  noPadding: { padding: [0, 0, 0, 0] },
  tileLayerIndex: 1,
};

export const Colors = {
  orange: '#eb6e4b',
  blue: '#0834c4',
};

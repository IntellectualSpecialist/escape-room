import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place, PlaceShort, Coords } from '../../types';

type MapProps = {
  markers: PlaceShort[];
  activeMarker?: Place;
  onMarkerClick?: (id: string) => void;
  mainPosition?: Coords;
  zoom?: number;
  height?: number;
}

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const position: LatLngExpression = [59.953941, 30.389507];

const defaultIcon = new Icon({
  iconUrl: 'img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [12, 42]
});

const activeIcon = new Icon({
  iconUrl: 'img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [12, 42]
});

const Map = ({markers, activeMarker, onMarkerClick, mainPosition, zoom, height}: MapProps): JSX.Element => {
  const handleMarkerClick = (id: string): void => {
    onMarkerClick?.(id);
  };

  const finalPosition = mainPosition ? mainPosition : position;

  return (
    <div className="map">
      <div className="map__container" >
        <MapContainer
          center={finalPosition as LatLngExpression}
          zoom={zoom ? zoom : 12}
          scrollWheelZoom
          style={{ height: `${height ? height : 529}px`, width: '100%' }}
        >
          <TileLayer
            attribution={COPYRIGHT}
            url={TILE_LAYER}
          />
          {markers.map((item) => {
            const {id, location} = item;
            const {coords} = location;
            const icon = id === activeMarker?.id ? activeIcon : defaultIcon;
            return (
              <Marker key={id} position={coords as LatLngExpression} icon={icon} eventHandlers={{
                click: () => {
                  handleMarkerClick(id);
                },
              }}
              />);
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

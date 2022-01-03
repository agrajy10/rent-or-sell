import { MapContainer, Marker, TileLayer } from 'react-leaflet';

function ListingLocation({ latitude, longitude }) {
  return (
    <MapContainer
      className="w-full h-full"
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}></Marker>
    </MapContainer>
  );
}

export default ListingLocation;

import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MADRID_COORDS } from "./data/coords";
import { GeojsonFeatureData, GeojsonLayer } from "./data/geojson";

type Feature = GeoJSON.Feature<GeoJSON.Geometry, GeojsonFeatureData>;
type LeafletMosueEvent = L.LeafletMouseEvent;
type Layer = L.Layer;
type MapMouseHandler = ({
  event,
  feature,
  layer,
}: {
  event: LeafletMosueEvent;
  feature: Feature;
  layer: Layer;
}) => void;

const Map = ({
  layer,
  onFeatureClick,
  onFeatureHover,
  fitBoundsOnChange,
}: {
  layer?: GeojsonLayer;
  onFeatureClick?: MapMouseHandler;
  onFeatureHover?: MapMouseHandler;
  fitBoundsOnChange?: boolean;
}) => {
  return (
    <MapContainer
      zoomControl={false}
      className="h-full w-full absolute top-0 left-0 z-0"
      center={MADRID_COORDS}
      zoom={6}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {layer && (
        <GeoJSON
          eventHandlers={{
            add: (event) => {
              if (!fitBoundsOnChange) return;

              const layer = event.target;
              const map = layer._map;

              map?.flyToBounds(layer.getBounds(), {
                animate: true,
                duration: 0.75,
              });
            },
          }}
          key={layer.properties.id}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: (event) => onFeatureClick?.({ event, feature, layer }),
              mouseover: (event) => onFeatureHover?.({ event, feature, layer }),
            });
          }}
          data={layer}
        />
      )}
    </MapContainer>
  );
};

export default Map;

import Map from "./Map";
import useGeojson, { usePrefetchGeojson } from "./hooks/useGeojson";
import { useSelectedLayer } from "./hooks/useSelectedLayer";

function App() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer();

  const { data: geojsonData } = useGeojson(selectedLayer);
  const { prefetchGeojson } = usePrefetchGeojson();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        layer={geojsonData}
        onFeatureClick={({ feature }) =>
          setSelectedLayer(feature.properties.id)
        }
        onFeatureHover={({ feature }) => prefetchGeojson(feature.properties.id)}
      />
    </div>
  );
}

export default App;

import Map from "./Map";
import { Card, CardContent } from "./components/Card";
import Flex from "./components/Flex";
import Join from "./components/Join";
import Link from "./components/Link";
import useGeojson, { usePrefetchGeojson } from "./hooks/useGeojson";
import { useSelectedLayer } from "./hooks/useSelectedLayer";
import { DoubleArrowRightIcon, UpdateIcon } from "@radix-ui/react-icons";

function App() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer();

  const { isLoading: isGeojsonLoading, data: geojsonData } =
    useGeojson(selectedLayer);
  const { prefetchGeojson } = usePrefetchGeojson();

  const breadcrumbs = [
    {
      name: geojsonData?.properties.parent_name,
      id: geojsonData?.properties.parent_id,
    },
    { name: geojsonData?.properties.name, id: geojsonData?.properties.id },
  ].filter((elem) => elem.id !== undefined && elem.id !== null);

  return (
    <div className="h-screen w-full relative">
      <Map
        fitBoundsOnChange
        layer={geojsonData}
        onFeatureClick={({ feature }) =>
          setSelectedLayer(feature.properties.id)
        }
        onFeatureHover={({ feature }) => prefetchGeojson(feature.properties.id)}
      />
      <div className="h-full w-[350px] absolute z-10 p-5 pointer-events-none">
        <Card className="h-fit w-fit pointer-events-auto">
          <CardContent className="p-1 pl-2 pr-2">
            <Flex className="items-center">
              {isGeojsonLoading ? (
                <div className="animate-spin text-gray-200">
                  <UpdateIcon />
                </div>
              ) : (
                <Join
                  separator={
                    <div className="text-xs text-gray-200 pr-2 pl-2">
                      <DoubleArrowRightIcon />
                    </div>
                  }
                >
                  {breadcrumbs.map(({ name, id }) => (
                    <Link
                      key={id}
                      className="text-xs text-gray-200"
                      onClick={() => setSelectedLayer(id!)}
                    >
                      {name}
                    </Link>
                  ))}
                </Join>
              )}
            </Flex>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

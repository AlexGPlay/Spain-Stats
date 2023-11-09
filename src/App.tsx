import { useState } from "react";
import Map from "./Map";
import { Card, CardContent } from "./components/Card";
import Flex from "./components/Flex";
import Join from "./components/Join";
import LayerSearch from "./components/LayerSearch";
import Link from "./components/Link";
import useGeojson, { usePrefetchGeojson } from "./hooks/useGeojson";
import { useSelectedLayer } from "./hooks/useSelectedLayer";
import {
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";

function App() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer();
  const [isLayerSearchOpen, setIsLayerSearchOpen] = useState(false);

  const { isLoading: isGeojsonLoading, data: geojsonData } =
    useGeojson(selectedLayer);
  const { prefetchGeojson } = usePrefetchGeojson();

  const breadcrumbs = [
    ...(geojsonData?.properties.parents || []),
    { name: geojsonData?.properties.name, id: geojsonData?.properties.id },
  ];

  return (
    <div className="h-screen w-full relative">
      <LayerSearch
        isOpen={isLayerSearchOpen}
        onOpenChange={(isOpen) => setIsLayerSearchOpen(isOpen)}
        onLayerSelected={(layerId) => {
          setIsLayerSearchOpen(false);
          setSelectedLayer(layerId);
        }}
      />
      <Map
        fitBoundsOnChange
        layer={geojsonData}
        onFeatureClick={({ feature }) =>
          setSelectedLayer(feature.properties.id)
        }
        onFeatureHover={({ feature }) => prefetchGeojson(feature.properties.id)}
      />
      <div className="h-full w-[350px] absolute z-10 p-5 pointer-events-none">
        <Flex className="gap-3">
          <Card
            onClick={() => setIsLayerSearchOpen(true)}
            className="flex justify-center items-center pl-2 pr-2 cursor-pointer pointer-events-auto"
          >
            <MagnifyingGlassIcon />
          </Card>
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
        </Flex>
      </div>
    </div>
  );
}

export default App;

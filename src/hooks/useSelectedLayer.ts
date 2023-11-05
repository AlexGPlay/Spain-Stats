import { useSearchParams } from "react-router-dom";

export const useSelectedLayer = (): [number, (layer: number) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const layer = searchParams.has("layer")
    ? Number(searchParams.get("layer"))
    : 0;

  return [
    layer,
    (layer: number) => {
      setSearchParams((params) => {
        params.set("layer", layer.toString());
        return params;
      });
    },
  ];
};

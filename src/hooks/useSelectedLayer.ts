import { useSearchParams } from "react-router-dom";

export const useSelectedLayer = (): [string, (layer: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const layer: string = searchParams.get("layer") || "0";

  return [
    layer,
    (layer: string) => {
      setSearchParams((params) => {
        params.set("layer", layer.toString());
        return params;
      });
    },
  ];
};

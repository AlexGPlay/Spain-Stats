import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGeojson } from "../data/geojson";

const buildKey = (id: number) => ["geojson", id];

export default function useGeojson(id: number) {
  return useQuery({
    queryKey: buildKey(id),
    queryFn: () => getGeojson(id),
  });
}

export function usePrefetchGeojson() {
  const queryClient = useQueryClient();

  const prefetchGeojson = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: buildKey(id),
      queryFn: () => getGeojson(id),
    });
  };

  return { prefetchGeojson };
}

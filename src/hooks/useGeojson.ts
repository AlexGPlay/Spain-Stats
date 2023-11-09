import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGeojson } from "../data/geojson";

const buildKey = (id: string) => ["geojson", id];

export default function useGeojson(id: string) {
  return useQuery({
    queryKey: buildKey(id),
    queryFn: () => getGeojson(id),
    staleTime: Infinity,
  });
}

export function usePrefetchGeojson() {
  const queryClient = useQueryClient();

  const prefetchGeojson = (id: string) => {
    const key = buildKey(id);
    if (queryClient.getQueryData(key)) return;

    queryClient.prefetchQuery({
      queryKey: buildKey(id),
      queryFn: () => getGeojson(id),
    });
  };

  return { prefetchGeojson };
}

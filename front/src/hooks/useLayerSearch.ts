import { searchLayer } from "@/data/search";
import { useQuery } from "@tanstack/react-query";

export default function useLayerSearch(search: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["searchLayer"],
    queryFn: searchLayer,
  });

  const usableResults = (search.length || 0) > 2 ? data || [] : [];

  return {
    isLoading,
    results: usableResults.filter((layer) =>
      layer.name.toLowerCase().includes(search.toLowerCase())
    ),
  };
}

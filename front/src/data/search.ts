export function searchLayer(): Promise<SearchResult[]> {
  return fetch(`./search/search.json`).then((res) => res.json());
}

export type SearchResult = {
  name: string;
  type: string;
  id: string;
};

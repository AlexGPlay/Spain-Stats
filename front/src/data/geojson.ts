export function getGeojson(id: string): Promise<GeojsonLayer> {
  return fetch(`/geojson/${id}.geojson`).then((res) => res.json());
}

export type Geojson<PropertiesType, FeatureProperties = PropertiesType> = {
  type:
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
  features: Geojson<FeatureProperties>[];
  properties: PropertiesType;
};

export type GeojsonFeatureData = {
  id: string;
  name: string;
  parents: { id: string; name: string }[];
};

export type GeojsonLayer = Geojson<GeojsonFeatureData>;

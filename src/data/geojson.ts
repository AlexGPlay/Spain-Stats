export function getGeojson(id: number): Promise<GeojsonLayer> {
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
  id: number;
  name: string;
  parent_id: number;
  parent_name: string;
};

export type GeojsonLayer = Geojson<GeojsonFeatureData>;

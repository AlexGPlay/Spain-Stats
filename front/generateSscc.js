import fs from "fs";

const data = {};

for (let i = 1; i <= 52; i++) {
  const provinceData = JSON.parse(
    fs.readFileSync(`./public/geojson/${i}.geojson`)
  );
  const parents = [
    ...provinceData.properties.parents,
    { id: provinceData.properties.id, name: provinceData.properties.name },
  ];

  provinceData.features.forEach((feature) => {
    const munData = {
      properties: {
        name: feature.properties.name,
        id: feature.properties.id,
        parents,
      },
      type: "FeatureCollection",
      features: [],
    };
    data[feature.properties.id] = munData;
  });
}

const allSsccData = JSON.parse(fs.readFileSync("./public/sscc.geojson"));
for (let sscc of allSsccData.features) {
  const cumun = sscc.properties.CUMUN;

  const parsedSscc = {
    type: "Feature",
    properties: {
      name: null,
      id: sscc.properties.CUSEC,
    },
    geometry: sscc.geometry,
  };

  if (!data[cumun]) {
    continue;
  }
  data[cumun].features.push(parsedSscc);
}

Object.keys(data).forEach((key) => {
  fs.writeFileSync(
    `./public/geojson/${key}.geojson`,
    JSON.stringify(data[key])
  );
});

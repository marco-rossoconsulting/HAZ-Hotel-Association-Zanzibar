// Generates simplified SVG outlines of Unguja and Pemba from Natural Earth (world-atlas, 1:10m).
// Run: node scripts/gen-map.mjs  -> writes src/data/zanzibar-map.json
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';
import { geoMercator, geoPath, geoBounds } from 'd3-geo';

const topo = JSON.parse(readFileSync(new URL('../node_modules/world-atlas/countries-10m.json', import.meta.url)));
const countries = feature(topo, topo.objects.countries);
const tz = countries.features.find((f) => f.properties.name === 'Tanzania');
const polys = tz.geometry.type === 'MultiPolygon' ? tz.geometry.coordinates : [tz.geometry.coordinates];

const pick = (minLon, maxLon, minLat, maxLat) =>
  polys.filter((p) => {
    const b = geoBounds({ type: 'Polygon', coordinates: p });
    return b[0][0] >= minLon && b[1][0] <= maxLon && b[0][1] >= minLat && b[1][1] <= maxLat;
  });

const unguja = pick(39.1, 39.7, -6.6, -5.6);
const pemba = pick(39.5, 40.0, -5.6, -4.8);
const all = { type: 'MultiPolygon', coordinates: [...unguja, ...pemba] };

const W = 600, H = 900;
const projection = geoMercator().fitExtent([[40, 30], [W - 40, H - 30]], { type: 'Feature', geometry: all });
const path = geoPath(projection);
const round = (d) => d.replace(/(\d+\.\d{1})\d+/g, '$1');

const out = {
  width: W,
  height: H,
  unguja: round(path({ type: 'MultiPolygon', coordinates: unguja })),
  pemba: round(path({ type: 'MultiPolygon', coordinates: pemba })),
  project: null,
  source: 'Natural Earth 1:10m via world-atlas (public domain)',
  // Projection parameters so places can be positioned by lon/lat at build time
  scale: projection.scale(),
  translate: projection.translate(),
};
writeFileSync(new URL('../src/data/zanzibar-map.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('unguja polys', unguja.length, 'pemba polys', pemba.length, 'scale', out.scale);

'use client';

import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

// World topojson (lightweight, can be replaced with a more detailed one if needed)
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Helper to guess map center and zoom
function getMapView(locations: string[]): { center: [number, number], zoom: number } {
  // Simple logic: if most locations are in Europe, center on Europe, etc.
  const europe = [
    'Netherlands', 'France', 'Germany', 'United Kingdom', 'Italy', 'Spain', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Portugal', 'Ireland', 'Greece', 'Romania', 'Bulgaria', 'Slovakia', 'Slovenia', 'Croatia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg', 'Iceland', 'Serbia', 'Ukraine', 'Russia', 'Turkey'
  ];
  const northAmerica = ['United States', 'Canada', 'Mexico'];
  const asia = ['China', 'Japan', 'South Korea', 'India', 'Singapore', 'Hong Kong', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'Taiwan', 'Pakistan', 'Bangladesh', 'Saudi Arabia', 'UAE', 'Israel'];
  let eu = 0, na = 0, as = 0;
  for (const loc of locations) {
    if (europe.includes(loc)) eu++;
    else if (northAmerica.includes(loc)) na++;
    else if (asia.includes(loc)) as++;
  }
  if (eu >= na && eu >= as && eu > 0) return { center: [15, 52], zoom: 2.5 }; // Europe
  if (na >= eu && na >= as && na > 0) return { center: [-95, 40], zoom: 1.7 }; // North America
  if (as >= eu && as >= na && as > 0) return { center: [100, 35], zoom: 2.2 }; // Asia
  return { center: [0, 20], zoom: 1 }; // World
}

// Dummy country centroids for demo; in production, use a geocoding API or a more complete mapping
const countryCentroids: Record<string, [number, number]> = {
  'Netherlands': [5.2913, 52.1326],
  'France': [2.2137, 46.6034],
  'Germany': [10.4515, 51.1657],
  'United Kingdom': [-3.435973, 55.378051],
  'Italy': [12.5674, 41.8719],
  'Spain': [-3.7492, 40.4637],
  'Belgium': [4.4699, 50.5039],
  'Switzerland': [8.2275, 46.8182],
  'Austria': [14.5501, 47.5162],
  'Sweden': [18.6435, 60.1282],
  'Norway': [8.4689, 60.472],
  'Denmark': [9.5018, 56.2639],
  'Finland': [25.7482, 61.9241],
  'Poland': [19.1451, 51.9194],
  'Czech Republic': [15.4729, 49.8175],
  'Hungary': [19.5033, 47.1625],
  'Portugal': [-8.2245, 39.3999],
  'Ireland': [-8.2439, 53.4129],
  'Greece': [21.8243, 39.0742],
  'Romania': [24.9668, 45.9432],
  'Bulgaria': [25.4858, 42.7339],
  'Slovakia': [19.699, 48.669],
  'Slovenia': [14.9955, 46.1512],
  'Croatia': [15.2, 45.1],
  'Estonia': [25.0136, 58.5953],
  'Latvia': [24.6032, 56.8796],
  'Lithuania': [23.8813, 55.1694],
  'Luxembourg': [6.1296, 49.8153],
  'Iceland': [-19.0208, 64.9631],
  'Serbia': [21.0059, 44.0165],
  'Ukraine': [31.1656, 48.3794],
  'Russia': [105.3188, 61.524],
  'Turkey': [35.2433, 38.9637],
  'United States': [-98.5795, 39.8283],
  'Canada': [-106.3468, 56.1304],
  'Mexico': [-102.5528, 23.6345],
  'China': [104.1954, 35.8617],
  'Japan': [138.2529, 36.2048],
  'South Korea': [127.7669, 35.9078],
  'India': [78.9629, 20.5937],
  'Singapore': [103.8198, 1.3521],
  'Hong Kong': [114.1694, 22.3193],
  'Malaysia': [101.9758, 4.2105],
  'Thailand': [100.9925, 15.870],
  'Vietnam': [108.2772, 14.0583],
  'Indonesia': [113.9213, -0.7893],
  'Philippines': [121.774, 12.8797],
  'Taiwan': [120.9605, 23.6978],
  'Pakistan': [69.3451, 30.3753],
  'Bangladesh': [90.3563, 23.685],
  'Saudi Arabia': [45.0792, 23.8859],
  'UAE': [53.8478, 23.4241],
  'Israel': [34.8516, 31.0461],
};

export default function MarketPresenceMap({ data = [] }: { data?: { location: string, type: string }[] }) {
  const locations = useMemo(() => data.map(d => d.location), [data]);
  const { center, zoom: initialZoom } = useMemo(() => getMapView(locations), [locations]);

  // Markers: get centroid for each country
  const markers = data.map(d => {
    let country = typeof d.location === 'string' ? d.location : '';
    if (country && country.includes(',')) {
      country = country.split(',').map(s => s.trim()).pop()!;
    }
    const coords = countryCentroids[country];
    return coords ? { ...d, coords } : null;
  }).filter(Boolean) as { location: string, type: string, coords: [number, number] }[];

  // --- Zoom State ---
  const [zoom, setZoom] = useState(initialZoom);
  // Reset zoom if data changes
  React.useEffect(() => { setZoom(initialZoom); }, [initialZoom]);

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.3, 10));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.3, 0.5));

  return (
    <div style={{ width: '100%', height: 290 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
        <button onClick={handleZoomIn} style={{ background: '#228BE6', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+</button>
        <button onClick={handleZoomOut} style={{ background: '#F1F3F5', color: '#222', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>-</button>
      </div>
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={250}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={center} zoom={zoom}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F8F9FA"
                  stroke="#CED4DA"
      style={{ 
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' }
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map((m, i) => (
            <Marker key={i} coordinates={m.coords}>
              <circle
                r={7}
                fill={m.type === 'headquarters' ? '#FF6B6B' : '#228BE6'}
                stroke="#fff"
                strokeWidth={2}
              />
              <text
                textAnchor="middle"
                y={-14}
                style={{ fontFamily: 'inherit', fontSize: 12, fill: '#212529', fontWeight: 600 }}
              >
                {m.type === 'headquarters' ? 'HQ' : ''}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
} 
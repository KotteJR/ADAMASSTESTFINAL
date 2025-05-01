'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function MarketPresenceMap() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: ['Netherlands', 'France', 'Germany'],
      z: [100, 75, 75], // Intensity values
      text: ['HQ', 'Market', 'Market'],
      colorscale: [
        [0, '#E9ECEF'],
        [1, '#228BE6']
      ],
      showscale: false,
      hovertemplate: '%{location}<br>%{text}<extra></extra>'
    }];

    const layout = {
      title: {
        text: 'Market Presence',
        font: { size: 16 },
        y: 0.95
      },
      geo: {
        scope: 'europe',
        showframe: false,
        projection: {
          type: 'mercator'
        },
        center: {
          lat: 50,
          lon: 10
        },
        resolution: 50
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 30, r: 0, b: 0, l: 0 },
      autosize: true,
      height: 250
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      staticPlot: true
    };

    Plotly.newPlot(chartRef.current, data, layout, config);

    const handleResize = () => {
      Plotly.Plots.resize(chartRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%', 
        height: '250px',
        position: 'relative'
      }} 
    />
  );
} 
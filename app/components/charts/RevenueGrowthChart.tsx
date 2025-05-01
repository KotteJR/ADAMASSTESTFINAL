'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function RevenueGrowthChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = {
      x: ['2022', '2023'],
      y: [233, 154],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#228BE6', width: 3 },
      marker: { size: 8 }
    };

    const layout = {
      title: {
        text: 'Revenue Growth (%)',
        font: { size: 16 },
        y: 0.95
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        showgrid: true,
        gridcolor: '#E9ECEF',
        fixedrange: true
      },
      yaxis: {
        showgrid: true,
        gridcolor: '#E9ECEF',
        title: 'Growth Rate (%)',
        fixedrange: true
      },
      margin: { t: 30, r: 10, b: 30, l: 60 },
      autosize: true,
      height: 250
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      staticPlot: true
    };

    Plotly.newPlot(chartRef.current, [data], layout, config);

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
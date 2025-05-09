'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function RevenueGrowthChart({ data = [] }: { data?: { year: number | string, revenue_growth_percent: number }[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!data || data.length === 0) {
      Plotly.purge(chartRef.current);
      return;
    }
    const years = data.map(d => String(d.year));
    const growth = data.map(d => d.revenue_growth_percent);
    const plotData = [{
      x: years,
      y: growth,
      type: 'bar',
      marker: { color: '#228BE6' },
      text: growth.map(v => v + '%'),
      textposition: 'auto',
      hovertemplate: '%{y}%<br>%{x}<extra></extra>'
    }];
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
    Plotly.newPlot(chartRef.current, plotData, layout, config);
    const handleResize = () => { Plotly.Plots.resize(chartRef.current); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) { Plotly.purge(chartRef.current); }
    };
  }, [data]);
  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No revenue growth data available</div>;
  }
  return <div ref={chartRef} style={{ width: '100%', height: '250px', position: 'relative' }} />;
} 
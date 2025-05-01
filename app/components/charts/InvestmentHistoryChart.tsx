'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function InvestmentHistoryChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [{
      x: ['2022-02', '2023-06'],
      y: [15, 10],
      type: 'bar',
      text: ['€15M', '€10M'],
      textposition: 'auto',
      marker: {
        color: '#228BE6'
      },
      hovertemplate: '%{text}<br>%{x}<extra></extra>'
    }];

    const layout = {
      title: {
        text: 'Investment History',
        font: { size: 16 },
        y: 0.95
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        title: 'Date',
        showgrid: true,
        gridcolor: '#E9ECEF',
        fixedrange: true
      },
      yaxis: {
        title: 'Amount (€M)',
        showgrid: true,
        gridcolor: '#E9ECEF',
        fixedrange: true
      },
      margin: { t: 30, r: 10, b: 30, l: 60 },
      autosize: true,
      height: 250,
      bargap: 0.4
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
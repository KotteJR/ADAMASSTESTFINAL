'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function ProductPortfolioChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [{
      values: [40, 20, 15, 15, 10],
      labels: [
        'Occupational Disability Insurance',
        'Business Liability Insurance',
        'Professional Liability Insurance',
        'Business Assets Insurance',
        'Disability Income Protection'
      ],
      type: 'pie',
      hole: 0.4,
      marker: {
        colors: ['#228BE6', '#339AF0', '#4DABF7', '#74C0FC', '#A5D8FF']
      },
      textinfo: 'label+percent',
      textposition: 'outside',
      automargin: true,
      hovertemplate: '%{label}<br>%{percent}<extra></extra>'
    }];

    const layout = {
      title: {
        text: 'Product Distribution',
        font: { size: 16 },
        y: 0.95
      },
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 30, r: 10, b: 10, l: 10 },
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
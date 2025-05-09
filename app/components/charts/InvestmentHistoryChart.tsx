'use client';

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function InvestmentHistoryChart({ data = [] }: { data?: { round_name: string, date: string, amount_raised: number, percent_increase_from_previous?: number }[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!data || data.length === 0) {
      Plotly.purge(chartRef.current);
      return;
    }
    // Use round_name or year from date as x labels
    const xLabels = data.map(d => d.round_name || (d.date ? String(new Date(d.date).getFullYear()) : ''));
    const yValues = data.map(d => d.amount_raised);
    const text = yValues.map(v => `€${v}M`);
    const plotData = [{
      x: xLabels,
      y: yValues,
      type: 'bar',
      text,
      textposition: 'auto',
      marker: { color: '#228BE6' },
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
        title: 'Round',
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
    Plotly.newPlot(chartRef.current, plotData, layout, config);
    const handleResize = () => { Plotly.Plots.resize(chartRef.current); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) { Plotly.purge(chartRef.current); }
    };
  }, [data]);
  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No investment history data available</div>;
  }
  return <div ref={chartRef} style={{ width: '100%', height: '250px', position: 'relative' }} />;
} 
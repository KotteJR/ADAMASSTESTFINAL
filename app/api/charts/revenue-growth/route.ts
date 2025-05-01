import { NextResponse } from 'next/server';
import Plotly from 'plotly.js-dist';

export async function GET() {
  try {
    const data = {
      x: ['2022', '2023'],
      y: [233, 154],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#228BE6', width: 3 },
      marker: { size: 8 }
    };

    const layout = {
      title: 'Revenue Growth (%)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        showgrid: true,
        gridcolor: '#E9ECEF'
      },
      yaxis: {
        showgrid: true,
        gridcolor: '#E9ECEF',
        title: 'Growth Rate (%)'
      },
      margin: { t: 40, r: 20, b: 40, l: 60 }
    };

    const config = {
      responsive: true,
      displayModeBar: false
    };

    const chartDiv = document.createElement('div');
    await Plotly.newPlot(chartDiv, [data], layout, config);
    const imageBuffer = await Plotly.toImage(chartDiv, { format: 'png', width: 800, height: 400 });

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return new NextResponse('Error generating chart', { status: 500 });
  }
} 
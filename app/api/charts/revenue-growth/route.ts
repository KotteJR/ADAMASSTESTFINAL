import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<Response> {
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

    return new NextResponse(JSON.stringify({ data, layout, config }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return new NextResponse('Error generating chart', { status: 500 });
  }
} 
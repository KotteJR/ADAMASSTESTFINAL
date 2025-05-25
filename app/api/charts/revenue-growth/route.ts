import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set the viewport size
    await page.setViewport({ width: 800, height: 400 });

    // Create HTML content with the chart
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        </head>
        <body>
          <div id="chart"></div>
          <script>
            const data = [{
      x: ['2022', '2023'],
      y: [233, 154],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#228BE6', width: 3 },
      marker: { size: 8 }
            }];

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

            Plotly.newPlot('chart', data, layout, config);
          </script>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    
    // Wait for the chart to render
    await page.waitForFunction(() => {
      const chart = document.querySelector('#chart');
      return chart && chart.querySelector('.plotly-graph-div');
    });

    // Take a screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    await browser.close();

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return NextResponse.json({ error: 'Error generating chart' }, { status: 500 });
  }
} 
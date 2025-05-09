import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const chartType = url.pathname.split('/').pop();

  if (!chartType) {
    return NextResponse.json({ error: 'Chart type not specified' }, { status: 400 });
  }

  try {
    const pythonProcess = spawn('python3', [
      join(process.cwd(), 'app/api/charts/route.py'),
      chartType
    ]);

    return new Promise((resolve, reject) => {
      let imageData = Buffer.from([]);

      pythonProcess.stdout.on('data', (data) => {
        imageData = Buffer.concat([imageData, data]);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          resolve(NextResponse.json({ error: 'Error generating chart' }, { status: 500 }));
        } else {
          resolve(new NextResponse(imageData, {
            headers: {
              'Content-Type': 'image/png',
              'Cache-Control': 'public, max-age=3600'
            }
          }));
        }
      });
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    return NextResponse.json({ error: 'Error generating chart' }, { status: 500 });
  }
} 
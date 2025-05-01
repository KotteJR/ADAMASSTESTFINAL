import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<Response> {
  return new NextResponse(JSON.stringify({
    endpoints: [
      '/api/charts/revenue-growth',
      '/api/charts/market-presence',
      '/api/charts/product-portfolio',
      '/api/charts/investment-history'
    ]
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 
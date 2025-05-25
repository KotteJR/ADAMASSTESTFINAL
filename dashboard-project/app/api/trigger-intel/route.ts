import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { company_name, legal_name, url, job_id } = body;

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    // Send request to n8n webhook
    const res = await fetch('https://n8n.profit-ai.com/webhook-test/generate-intel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name, legal_name, url, job_id }),
      signal: controller.signal
    });

    clearTimeout(timeoutId); // Clear the timeout

    // Log the response status and headers for debugging
    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    // Get the response as text
    const responseText = await res.text();
    console.log("Response from n8n:", responseText);

    // Handle different status codes
    if (res.status === 504) {
      return NextResponse.json({ 
        error: 'Request timed out', 
        details: 'The n8n webhook took too long to respond. Please try again.',
        status: 504 
      }, { status: 504 });
    }

    if (!res.ok) {
      return NextResponse.json({ 
        error: 'Failed to trigger n8n workflow', 
        details: responseText,
        status: res.status 
      }, { status: res.status });
    }

    let json;
    try {
      json = JSON.parse(responseText);
    } catch (err) {
      console.error('Error parsing response as JSON:', err);
      return NextResponse.json({ 
        error: 'Received non-JSON response from n8n', 
        details: responseText,
        status: 500 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, result: json });
  } catch (err: any) {
    console.error('Trigger error:', err);
    
    // Handle specific error types
    if (err.name === 'AbortError') {
      return NextResponse.json({ 
        error: 'Request timeout', 
        details: 'The request took too long to complete',
        status: 504 
      }, { status: 504 });
    }

    return NextResponse.json({ 
      error: 'Trigger failed', 
      details: err.message,
      status: 500 
    }, { status: 500 });
  }
} 
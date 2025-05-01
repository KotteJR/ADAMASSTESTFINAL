import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { company_name, legal_name, url, job_id } = body;

  try {
    // Send request to n8n webhook
    const res = await fetch('https://n8n.profit-ai.com/webhook-test/generate-intel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name, legal_name, url, job_id }),
    });

    // Log the response text for debugging purposes
    const responseText = await res.text();  // Get the response as text
    console.log("Response from n8n: ", responseText);

    // Check if the response is OK before parsing as JSON
    if (!res.ok) {
      throw new Error(`Failed to trigger n8n workflow: ${res.statusText}`);
    }

    let json;
    try {
      json = JSON.parse(responseText);  // Try parsing the response as JSON
    } catch (err) {
      console.error('Error parsing response as JSON:', err);
      return NextResponse.json({ error: 'Received non-JSON response from n8n', details: responseText }, { status: 500 });
    }

    // Return the successful JSON response from n8n
    return NextResponse.json({ success: true, result: json });
  } catch (err: any) {
    console.error('Trigger error:', err);
    return NextResponse.json({ error: 'Trigger failed', details: err.message }, { status: 500 });
  }
}

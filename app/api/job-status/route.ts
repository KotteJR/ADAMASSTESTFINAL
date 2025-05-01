import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const job_id = searchParams.get('job_id');

  if (!job_id) {
    return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('intel_results')
    .select('source, status, data')
    .eq('job_id', job_id);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }

  const statuses: Record<string, { status: string; content: string }> = {
    Tavily: { status: 'Pending', content: '' },
    BuiltWith: { status: 'Pending', content: '' },
    DNSDumpster: { status: 'Pending', content: '' },
    PageSpeed: { status: 'Pending', content: '' },
  };

  data.forEach((row) => {
    statuses[row.source] = {
      status: row.status || 'done',
      content: typeof row.data === 'string' ? row.data : JSON.stringify(row.data, null, 2),
    };
  });

  return NextResponse.json({ statuses });
}

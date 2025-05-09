import { TextInput, Button, Text, Title, Tabs, Loader, ActionIcon, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import classes from "./Chatbot.module.scss";
import { v4 as uuidv4 } from 'uuid';

export function Chatbot() {
  const [selectedSection, setSelectedSection] = useState('Overview');
  const [companyName, setCompanyName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'raw' | 'ai'>('raw');

  const [statuses, setStatuses] = useState<Record<string, { status: string; content: string }>>({
    Tavily: { status: 'Pending', content: '' },
    BuiltWith: { status: 'Pending', content: '' },
    DNSDumpster: { status: 'Pending', content: '' },
    PageSpeed: { status: 'Pending', content: '' },
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const jobId = localStorage.getItem('currentJobId');
      if (!jobId) return;

      try {
        const res = await fetch(`/api/job-status?job_id=${jobId}`);
        const data: { statuses: Record<string, { status: string; content: string }> } = await res.json();
        setStatuses(data.statuses);

        if (Object.values(data.statuses).every((s) => s.status === 'done')) {
          setSelectedSection('Overview');
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    const jobId = uuidv4();

    try {
      const res = await fetch('/api/trigger-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          legal_name: legalName,
          url,
          job_id: jobId,
        }),
      });

      if (!res.ok) throw new Error('Trigger failed');
      localStorage.setItem('currentJobId', jobId);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while generating the report.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.dashboardWrapper}>
      <div className={classes.leftPanel}>
        <TextInput label="Company Name" required value={companyName} onChange={(e) => setCompanyName(e.currentTarget.value)} />
        <TextInput label="Legal Name" required value={legalName} onChange={(e) => setLegalName(e.currentTarget.value)} />
        <TextInput label="Website URL" required value={url} onChange={(e) => setUrl(e.currentTarget.value)} />

        <div className={classes.aiLogs}>
          {Object.entries(statuses).map(([source, { status, content }]) => (
            <div key={source} style={{ marginBottom: '0rem' }}>
              <p><strong>{source}</strong>: {status}</p>
              {status === 'done' && (
                <pre style={{ fontSize: '0rem', whiteSpace: 'pre-wrap' }}>{content}</pre>
              )}
            </div>
          ))}
        </div>

        <Button fullWidth loading={isLoading} onClick={handleGenerate}>
          Generate →
        </Button>
      </div>

      {/* Middle Panel with Tabs */}
      <div className={classes.middlePanel}>
        <Tabs
          defaultValue="Tavily"
          styles={{
            panel: {
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Tabs.List>
            {Object.keys(statuses).map((source) => (
              <Tabs.Tab key={source} value={source}>
                {source}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {Object.entries(statuses).map(([source, { status, content }]) => (
            <Tabs.Panel key={source} value={source} pt="xs" style={{ flex: 1, height: '100%' }}>
              <Group align="center" mb="md">
                <ActionIcon variant="outline" onClick={() => setView('raw')}><IconArrowLeft size={16} /></ActionIcon>
                <ActionIcon variant="outline" onClick={() => setView('ai')}><IconArrowRight size={16} /></ActionIcon>
              </Group>
              <div className={classes.card}>
                {view === 'raw' ? (
                  <>
                    <Text fw={500} mb="sm">Raw Output</Text>
                    {status !== 'done' ? (
                      <Loader size="sm" />
                    ) : content ? (
                      <pre style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{content}</pre>
                    ) : (
                      <Text>No data found.</Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text fw={500} mb="sm">AI Analysis</Text>
                    {status !== 'done' ? (
                      <Loader size="sm" />
                    ) : (
                      <Text>This is where the AI summary or insights will go.</Text>
                    )}
                  </>
                )}
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>

      {/* Right Panel (Placeholder for chatbot) */}
      <div className={classes.rightPanel}>
        {/* Placeholder for future chatbot */}
      </div>
    </div>
  );
}

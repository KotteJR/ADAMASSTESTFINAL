'use client';

import { useState, useEffect } from 'react';
import { TextInput, Button, Group, Text, Paper, Stack } from '@mantine/core';
import { supabase } from '@/lib/supabase';

export function CompanyInformation() {
  const [companyName, setCompanyName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate a unique job ID
      const newJobId = `job_${Date.now()}`;
      setJobId(newJobId);

      // Store the initial data in Supabase
      const { error: dbError } = await supabase
        .from('intel_results')
        .insert([
          {
            job_id: newJobId,
            source: 'initial',
            status: 'pending',
            data: {
              company_name: companyName,
              legal_name: legalName,
              url: url
            }
          }
        ]);

      if (dbError) throw dbError;

      // Trigger the intel generation
      const response = await fetch('/api/trigger-intel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          legal_name: legalName,
          url: url,
          job_id: newJobId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger intel generation');
      }

      // Start polling for results
      pollForResults(newJobId);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const pollForResults = async (jobId: string) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/job-status?job_id=${jobId}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Check if all sources are complete
        const allComplete = Object.values(data.statuses).every(
          (status: any) => status.status === 'done'
        );

        if (allComplete) {
          setLoading(false);
          // Handle completion - you might want to redirect or show results
          return;
        }

        // Continue polling
        setTimeout(checkStatus, 5000);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    checkStatus();
  };

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Stack gap="md">
        <Text size="xl" fw={700}>Company Information</Text>
        
        <TextInput
          label="Company Name"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <TextInput
          label="Legal Name"
          placeholder="Enter legal name"
          value={legalName}
          onChange={(e) => setLegalName(e.target.value)}
          required
        />

        <TextInput
          label="Company URL"
          placeholder="Enter company URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}

        <Group justify="flex-end">
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!companyName || !legalName || !url}
          >
            Generate Report
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
} 
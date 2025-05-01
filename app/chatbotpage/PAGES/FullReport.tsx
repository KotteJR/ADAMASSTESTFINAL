"use client";

import { Tabs, Text, Loader, Title } from "@mantine/core";
import { useState, useEffect } from "react";

export function FullReport() {
  const [rawData, setRawData] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch raw + AI data from backend/Supabase/n8n
    setLoading(true);
    fetch(`/api/report-data?section=public-info`) // adapt to your structure
      .then((res) => res.json())
      .then((data) => {
        setRawData(data.raw || "");
        setAiSummary(data.ai || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "1rem", paddingTop: "1.5rem" }}>
      <Tabs defaultValue="raw" keepMounted={false}>
        <Tabs.List style={{ marginBottom: "0.5rem" }}>
          <Tabs.Tab value="raw">Raw Output</Tabs.Tab>
          <Tabs.Tab value="ai">AI Analysis</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="raw">
          {loading ? (
            <Loader />
          ) : (
            <Text style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
              {rawData || "No data found."}
            </Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="ai">
          {loading ? (
            <Loader />
          ) : (
            <Text style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
              {aiSummary || "No analysis available."}
            </Text>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

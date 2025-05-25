"use client";

import { useEffect, useState, useRef } from "react";
import { Tabs, Text, Loader, Card, Title, Modal, Progress, Chip, Group, Paper, Alert, Button, Collapse, Box, Center, SimpleGrid, Stack, RingProgress } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";

const supabaseUrl = "https://gmaktpbyligmrflxnsui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYWt0cGJ5bGlnbXJmbHhuc3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTQ4MTMsImV4cCI6MjA1OTA3MDgxM30.vH535RIHMZOAtVrasIIXkh3YrEZczMl3SewPB3usiHE";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for badge icon
function BadgeIcon({ type }: { type: string }) {
  if (type === "positive") return <IconCheck size={18} style={{ marginRight: 6 }} />;
  if (type === "negative") return <IconAlertTriangle size={18} style={{ marginRight: 6 }} />;
  return null;
}

export function Architecture() {
  const [rawData, setRawData] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("raw");
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const hasFetched = useRef(false);
  const [rawOpenAI, setRawOpenAI] = useState<string>("");
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({});
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const currentJobId = localStorage.getItem("report?jobId=e6faf05d-6999-4c98-8156-89fea65e4047");
    setJobId(currentJobId);

    if (!currentJobId) {
      setError("No analysis has been run yet. Please provide company information first.");
      setLoading(false);
      return;
    }

    if (hasFetched.current && jobId === currentJobId) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("intel_results")
        .select("data")
        .eq("job_id", currentJobId)
        .in("source", ["BuiltWith", "PageSpeed"])
        .order("created_at", { ascending: false });

      if (error) {
        setError(`Error fetching raw data: ${error.message}`);
      } else {
        const parsedResult = data.map((d: any) => {
          try {
            return typeof d.data === "string"
              ? JSON.stringify(JSON.parse(d.data), null, 2)
              : JSON.stringify(d.data, null, 2);
          } catch {
            return typeof d.data === "string" ? d.data : JSON.stringify(d.data, null, 2);
          }
        }).join("\n\n---\n\n");

        setRawData(parsedResult);
      }
    };

    const fetchAiSummary = async () => {
      const { data, error } = await supabase
        .from("intel_results")
        .select("data")
        .eq("job_id", currentJobId)
        .in("source", ["BuiltWith_AI", "PageSpeed_AI"])
        .order("created_at", { ascending: false });

      if (error) {
        setError(`Error fetching AI analysis: ${error.message}`);
      } else {
        const aiText = data.map((d: any) => d.data).join("\n\n---\n\n") || "";
        await restructureAiData(aiText);
      }
    };

    const restructureAiData = async (aiText: string) => {
      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aiText,
            context: "architecture"
          })
        });

        if (response.status === 504) {
          throw new Error("The request timed out. Please try again in a few moments.");
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.details || `Failed to fetch AI analysis. Status: ${response.status}`);
        }

        const { structuredData, rawOpenAI } = await response.json();
        setRawOpenAI(rawOpenAI || "");
        setAiSummary(structuredData);
      } catch (error: any) {
        console.error("Error restructuring AI data:", error);
        setError(error.message || "An unexpected error occurred while processing the AI analysis.");
      }
    };

    if (currentJobId) {
      setLoading(true);
    fetchData().then(fetchAiSummary).finally(() => {
      setLoading(false);
      hasFetched.current = true;
    });
    }
  }, []);

  const handleCardClick = (section: string) => {
    const content = aiSummary?.[section] || "No content available.";
    setModalContent(content);
    setOpened(true);
  };

  const backgroundImages: Record<string, string> = {
    summary: "/summary.png",
    insights: "/insights.png",
    recommendations: "/recommendations.png"
  };

  if (loading) {
    return (
      <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader size="md" />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", paddingTop: "1.5rem" }}>
      <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value ?? "raw")}> 
        <Tabs.List style={{ marginBottom: "0.5rem" }}>
          <Tabs.Tab value="raw">Initial Findings</Tabs.Tab>
          <Tabs.Tab value="ai">AI - Analysis</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="raw">
          {error ? (
            <Text>{error}</Text>
          ) : (
            <div style={{ backgroundColor: "#1E2A47", color: "#FFFFFF", padding: "1rem", fontFamily: "monospace", borderRadius: "8px", width: "100%", overflowY: "auto" }}>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem", wordWrap: "break-word" }}>{rawData || "No raw data found."}</pre>
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="ai">
          {error ? (
            <Text>{error}</Text>
          ) : aiSummary ? (
            <Box style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 0", background: "#fff", fontFamily: 'Inter, Roboto, Helvetica Neue, Arial, system-ui, sans-serif' }}>
              {/* Overall Score Section */}
              <Box mb={32} style={{ background: "transparent", padding: 0 }}>
                <Title order={2} mb={8} style={{ color: "#1a202c", fontWeight: 700, fontSize: 24, textAlign: "left" }}>Architecture Score</Title>
                <Group gap={8} align="center" style={{ justifyContent: "flex-start", marginBottom: 8 }}>
                  <Text size="sm" fw={600} style={{ color: '#6b7280', fontSize: 15 }}>Total Score</Text>
                  <Progress
                    value={aiSummary.overall_score * 10}
                    w={180}
                    color={aiSummary.overall_score >= 7 ? "green" : aiSummary.overall_score >= 4 ? "yellow" : "red"}
                  radius="md"
                    size="md"
                    style={{ flex: 1 }}
                  />
                  <Text size="sm" fw={700} style={{ color: '#6b7280', fontSize: 15 }}>{aiSummary.overall_score}/10</Text>
                </Group>
                {Array.isArray(aiSummary?.badges) && aiSummary.badges.length > 0 && (
                  <Group gap="xs" mt={8} style={{ justifyContent: "flex-start", flexWrap: "wrap", overflowX: "auto" }}>
                    {aiSummary.badges.map((badge: any, idx: number) => (
                      <span
                        key={idx}
                  style={{
                          display: "inline-block",
                          background: badge.type === "positive" ? "#e0f7e9" : badge.type === "negative" ? "#ffeaea" : "#f0f0f0",
                          color: "#222",
                          borderRadius: 18,
                          fontWeight: 500,
                          fontSize: 15,
                          padding: "7px 20px",
                          marginRight: 6,
                          marginBottom: 6
                        }}
                      >
                        <BadgeIcon type={badge.type} />
                        {badge.label}
                      </span>
                    ))}
                  </Group>
                )}
              </Box>
              <Box my={32} style={{ borderBottom: "1px solid #e5e7eb" }} />

              {/* Subscores */}
              {aiSummary.subscores && (
                <Box mb={32} style={{ background: "transparent", padding: 0 }}>
                  <Title order={4} mb={12} style={{ color: "#1a202c", fontWeight: 600, fontSize: 18, textAlign: "left" }}>Subscores</Title>
                  <SimpleGrid cols={2} spacing="md"> 
                    {Object.entries(aiSummary.subscores).map(([key, value]: [string, any]) => (
                      <Box key={key} mb={8}>
                        <Text size="sm" color="dimmed" mb={4} style={{ textTransform: "capitalize" }}>{key.replace("_", " ")}</Text>
                        <Progress value={value * 10} w="100%" color={value >= 7 ? "green" : value >= 4 ? "yellow" : "red"} radius="md" size="md" />
                        <Text size="xs" color={value >= 7 ? "green" : value >= 4 ? "yellow" : "red"} mt={2}>{value}/10</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
              <Box my={32} style={{ borderBottom: "1px solid #e5e7eb" }} />

              {/* Main Good & Main Risks */}
              <SimpleGrid cols={2} spacing="xl" mb={32}> 
                <Box style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 20 }}>
                  <Title order={4} c="green" mb={8} style={{ fontWeight: 600, fontSize: 18, color: "#1a7f37" }}>Key Strengths</Title>
                  <Stack gap={10}>
                    {(aiSummary.main_good || []).map((good: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <IconCheck color="#1a7f37" size={20} />
                        <span style={{ color: "#1a7f37", fontSize: 16, fontWeight: 500 }}>{good}</span>
                      </div>
                    ))}
                  </Stack>
                </Box>
                <Box style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 20 }}>
                  <Title order={4} c="red" mb={8} style={{ fontWeight: 600, fontSize: 18, color: "#c92a2a" }}>Key Risks</Title>
                  <Stack gap={10}>
                    {(aiSummary.main_risks || []).map((risk: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <IconAlertTriangle color="#c92a2a" size={20} />
                        <span style={{ color: "#c92a2a", fontSize: 16, fontWeight: 500 }}>{risk}</span>
                  </div>
                    ))}
                  </Stack>
                </Box>
              </SimpleGrid>
              <Box my={32} style={{ borderBottom: "1px solid #e5e7eb" }} />

              {/* Section Cards */}
              <Stack gap={32}>
                {["summary", "insights", "recommendations"].map((section) => (
                  <Box key={section} style={{ background: "transparent", padding: 0 }}>
                    <Title order={3} mb={8} style={{ color: "#003366", fontWeight: 600, fontSize: 20, textAlign: "left" }}>{section.charAt(0).toUpperCase() + section.slice(1)}</Title>
                    {aiSummary?.[section]?.highlight && (
                      <Box mb={8} style={{ background: "#f5faff", borderLeft: "4px solid #228be6", padding: "10px 16px" }}>
                        <Text style={{ color: "#228be6", fontWeight: 500 }}><b>Highlight:</b> {aiSummary[section].highlight}</Text>
                      </Box>
                    )}
                    <Text style={{ fontWeight: 500, marginBottom: 6, fontSize: 15 }}>
                      {aiSummary[section].preview || aiSummary[section].snippet || "No preview available."}
                    </Text>
                    <Button
                      size="xs"
                      variant="subtle"
                      color="blue"
                      onClick={() => setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))}
                      style={{ marginBottom: 8 }}
                    >
                      {expanded[section] ? "Hide full text" : "Read more"}
                    </Button>
                    <Collapse in={!!expanded[section]}>
                      <Text style={{ whiteSpace: "pre-wrap", fontSize: 15, marginTop: 4 }}>
                        {aiSummary[section].text || "No content available."}
                  </Text>
                    </Collapse>
                  </Box>
              ))}
              </Stack>
              <Box my={32} style={{ borderBottom: "1px solid #e5e7eb" }} />

              {/* Raw AI Output Debug */}
             
            </Box>
          ) : (
            <Text>No AI analysis available.</Text>
          )}
        </Tabs.Panel>
      </Tabs>

      <Modal opened={opened} onClose={() => setOpened(false)} title="AI Analysis Details">
        <Text>{modalContent}</Text>
      </Modal>
    </div>
  );
}
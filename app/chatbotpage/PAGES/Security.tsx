"use client";

import { useEffect, useState, useRef } from "react";
import { Tabs, Text, Loader, Card, Title, Modal, Divider } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmaktpbyligmrflxnsui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYWt0cGJ5bGlnbXJmbHhuc3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTQ4MTMsImV4cCI6MjA1OTA3MDgxM30.vH535RIHMZOAtVrasIIXkh3YrEZczMl3SewPB3usiHE";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Security() {
  const [rawData, setRawData] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("raw");
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const hasFetched = useRef(false);
  const [findings, setFindings] = useState<any[]>([]);


  useEffect(() => {
    const job_id = "835df3af-e594-4973-ae07-a330a389cba6";
    if (!job_id) {
      setError("Job ID not found.");
      setLoading(false);
      return;
    }

    if (hasFetched.current) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("intel_results")
        .select("data")
        .eq("job_id", job_id)
        .in("source", ["DnsDumpster", "SubDomains", "SecureHeaders"])
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
        .eq("job_id", job_id)
        .in("source", ["DnsDumpster_AI", "SubDomains_AI", "SecureHeaders_AI"])
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
            context: "security"
          })
        });

        if (!response.ok) throw new Error(`Failed to fetch AI analysis. Status: ${response.status}`);

        const { structuredData, findingsTable } = await response.json();
        setFindings(findingsTable || []);


        let parsedText = "";
        try {
          const json = JSON.parse(structuredData);
          parsedText = json?.structuredData || "";
        } catch (err) {
          parsedText = structuredData;
        }

        const summaryMatch = parsedText.match(/\*\*Summary\*\*([\s\S]*?)(?=\*\*|$)/i);
        const insightsMatch = parsedText.match(/\*\*Insights\*\*([\s\S]*?)(?=\*\*|$)/i);
        const recommendationsMatch = parsedText.match(/\*\*Recommendations\*\*([\s\S]*?)(?=\*\*|$)/i);

        const structured = {
          summary: summaryMatch?.[1]?.trim() || "No summary available.",
          insights: insightsMatch?.[1]?.trim() || "No insights available.",
          recommendations: recommendationsMatch?.[1]?.trim() || "No recommendations available."
        };

        setAiSummary(structured);
      } catch (error: any) {
        setError(`Error restructuring AI data: ${error.message}`);
      }
    };

    fetchData().then(fetchAiSummary).finally(() => {
      setLoading(false);
      hasFetched.current = true;
    });
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

        <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
  <Title order={2} style={{ marginTop: "1rem", marginBottom: "1rem", color: "#003366" }}>Critical Findings</Title>
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
          <th style={{ padding: "0.75rem 1rem" }}>Category</th>
          <th style={{ padding: "0.75rem 1rem" }}>Finding</th>
          <th style={{ padding: "0.75rem 1rem" }}>Status</th>
          <th style={{ padding: "0.75rem 1rem" }}>Fix Priority</th>
        </tr>
      </thead>
      <tbody>
        {(findings.length > 0 ? findings : [
          { category: "SSL/TLS", finding: "TLS 1.0 still enabled", status: "⚠️", priority: "High" },
          { category: "DNS Records", finding: "7 subdomains exposed", status: "🔥", priority: "Medium" },
          { category: "Headers", finding: "HSTS not enforced", status: "❌", priority: "Medium" }
        ]).map((row, index) => (

          <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "0.75rem 1rem" }}>{row.category}</td>
            <td style={{ padding: "0.75rem 1rem" }}>{row.finding}</td>
            <td style={{ padding: "0.75rem 1rem" }}>{row.status}</td>
            <td style={{ padding: "0.75rem 1rem" }}>{row.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

<Title order={2} style={{ marginTop: "1rem", marginBottom: "1rem", color: "#003366" }}>Overview of Findings</Title>


          {error ? (
            
            <Text>{error}</Text>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", paddingBottom: "1rem" }}>
              {["summary", "insights", "recommendations"].map((key) => (
                
                

                <Card
                  key={key}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  onClick={() => handleCardClick(key)}
                  style={{
                    position: "relative",
                    height: "26.5rem",
                    width: "30%",
                    cursor: "pointer",
                    overflow: "hidden",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundImage: `url('${backgroundImages[key]}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backdropFilter: "blur(4.5px)", backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 0 }} />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <Title order={3} style={{ marginBottom: "0.5rem" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Title>
                    <Text style={{ fontSize: "0.9rem", paddingRight: "0.2rem", lineHeight: 1.4 }}>{(aiSummary?.[key]?.slice(0, 200) || "No preview available.") + "..."}</Text>
                  </div>

                  <Text
                    style={{
                      position: "relative",
                      zIndex: 1,
                      alignSelf: "flex-start",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      marginTop: "1rem"
                    }}
                  >
                    View Full
                  </Text>
                </Card>
              ))}
            </div>
          )}
          
        </Tabs.Panel>
      </Tabs>


      <Modal opened={opened} onClose={() => setOpened(false)} title="AI Analysis Details">
        <Text>{modalContent}</Text>
      </Modal>
    </div>
  );
}
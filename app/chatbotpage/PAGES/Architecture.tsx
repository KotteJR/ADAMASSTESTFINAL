"use client";

import { useEffect, useState, useRef } from "react";
import { Tabs, Text, Loader, Card, Title, Modal } from "@mantine/core";
import { supabase } from "@/lib/supabase";

export function Architecture() {
  const [rawData, setRawData] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("raw");
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const hasFetched = useRef(false);

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
        .eq("job_id", job_id)
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

        if (!response.ok) throw new Error(`Failed to fetch AI analysis. Status: ${response.status}`);

        const { structuredData } = await response.json();

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
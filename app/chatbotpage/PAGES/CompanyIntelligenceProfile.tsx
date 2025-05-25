"use client";

import { useEffect, useState, useRef } from "react";
import { Tabs, Text, Loader, Card, Title, Modal } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { CompanyIntelligenceProfileView } from "./CompanyIntelligenceProfileView";

const supabaseUrl = "https://gmaktpbyligmrflxnsui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYWt0cGJ5bGlnbXJmbHhuc3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTQ4MTMsImV4cCI6MjA1OTA3MDgxM30.vH535RIHMZOAtVrasIIXkh3YrEZczMl3SewPB3usiHE";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function CompanyIntelligenceProfile() {
  const [rawData, setRawData] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("raw");
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const hasFetched = useRef(false);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const currentJobId = localStorage.getItem("currentJobId");
    console.log("[CompanyIntelligenceProfile] useEffect - currentJobId from localStorage:", currentJobId);
    setJobId(currentJobId);

    if (!currentJobId) {
      setError("No analysis has been run yet. Please provide company information first.");
      setLoading(false);
      return;
    }

    if (hasFetched.current && jobId === currentJobId) return;

    const fetchData = async () => {
      console.log(`[CompanyIntelligenceProfile] fetchData - Fetching raw data for job_id: ${currentJobId}, source: Crunchbase`);
      const { data, error: dbError } = await supabase
        .from("intel_results")
        .select("data, source")
        .eq("job_id", currentJobId)
        .eq("source", "Crunchbase")
        .order("created_at", { ascending: false });

      if (dbError) {
        console.error("[CompanyIntelligenceProfile] fetchData - Supabase error:", dbError);
        setError(`Error fetching raw data: ${dbError.message}`);
      } else {
        console.log("[CompanyIntelligenceProfile] fetchData - Raw data received from Supabase (source Crunchbase):", data);
        if (!data || data.length === 0) {
          console.warn("[CompanyIntelligenceProfile] fetchData - No raw data found in Supabase for source Crunchbase and job_id:", currentJobId);
          setRawData("No raw data found for Crunchbase.");
        } else {
          const latestCrunchbaseEntry = data[0];
          console.log(`[CompanyIntelligenceProfile] fetchData - Processing source: ${latestCrunchbaseEntry.source}`);
          let parsedResult = "";
          try {
            parsedResult = typeof latestCrunchbaseEntry.data === "string"
              ? JSON.stringify(JSON.parse(latestCrunchbaseEntry.data), null, 2)
              : JSON.stringify(latestCrunchbaseEntry.data, null, 2);
          } catch {
            parsedResult = typeof latestCrunchbaseEntry.data === "string" ? latestCrunchbaseEntry.data : JSON.stringify(latestCrunchbaseEntry.data, null, 2);
          }
          setRawData(parsedResult);
        }
      }
    };

    const fetchAiSummary = async () => {
      console.log(`[CompanyIntelligenceProfile] fetchAiSummary - Fetching AI input data for job_id: ${currentJobId}, source: Crunchbase`);
      const { data, error: dbError } = await supabase
        .from("intel_results")
        .select("data")
        .eq("job_id", currentJobId)
        .in("source", ["Crunchbase"])
        .order("created_at", { ascending: false });

      if (dbError) {
        console.error("[CompanyIntelligenceProfile] fetchAiSummary - Supabase error:", dbError);
        setError(`Error fetching AI analysis input: ${dbError.message}`);
      } else {
        console.log("[CompanyIntelligenceProfile] fetchAiSummary - AI input data received from Supabase (source Crunchbase):", data);
        if (!data || data.length === 0) {
          console.warn("[CompanyIntelligenceProfile] fetchAiSummary - No data found in Supabase for source Crunchbase (AI input) and job_id:", currentJobId);
          setError("Could not load Crunchbase data to generate AI summary.");
          setAiSummary(null);
          return;
        }
        const aiText = data.map((d: any) => {
          try {
            return typeof d.data === "string" ? d.data : JSON.stringify(d.data, null, 2);
          } catch {
            return typeof d.data === "string" ? d.data : JSON.stringify(d.data, null, 2);
          }
        }).join("\n\n---\n\n") || "";
        console.log("[CompanyIntelligenceProfile] fetchAiSummary - Text being sent to restructureAiData:", aiText.substring(0, 500) + "...");
        if (!aiText.trim()) {
          console.warn("[CompanyIntelligenceProfile] fetchAiSummary - aiText for restructureAiData is empty.");
          setError("Crunchbase data for AI summary was empty.");
          setAiSummary(null);
          return;
        }
        await restructureAiData(aiText);
      }
    };

    const restructureAiData = async (aiText: string) => {
      console.log("[CompanyIntelligenceProfile] restructureAiData - Calling /api/openai with context: company_intelligence");
      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aiText,
            context: "company_intelligence"
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[CompanyIntelligenceProfile] restructureAiData - API call failed:", response.status, errorText);
          throw new Error(`Failed to process AI data. Status: ${response.status}. Details: ${errorText}`);
        }

        const { structuredData } = await response.json();
        console.log("[CompanyIntelligenceProfile] restructureAiData - Structured data received from API:", structuredData);
        
        const defaultData = {
          company_overview: {
            official_company_name: "Unknown",
            website: "",
            overview: "",
            industry: "",
            headquarters: "",
            other_locations: [],
            founding_date: "",
            founders: [],
            key_team_members: [],
            number_of_employees: 0,
            company_mission: "",
            unique_selling_points: [],
            products_services: [],
            main_competitors: [],
            ip_trademarks: []
          },
          financials_metrics: {
            revenue: null,
            profit: null,
            ebitda: null,
            it_spend: null,
            web_visits: null,
            growth_scores: {
              "2022": "0%",
              "2023": "0%"
            },
            active_website_tech_count: null
          },
          funding_rounds: {
            rounds: [],
            total_funding_amount: ""
          },
          investors: [],
          news_press: [],
          acquisitions: [],
          customer_testimonials: [],
          contact_information: {
            email: null,
            phone: null,
            address: "",
            other: {}
          }
        };
        const mergedData = {
          ...defaultData,
          ...structuredData,
          company_overview: {
            ...defaultData.company_overview,
            ...(structuredData?.company_overview || {})
          },
          financials_metrics: {
            ...defaultData.financials_metrics,
            ...(structuredData?.financials_metrics || {}),
            growth_scores: {
              ...defaultData.financials_metrics.growth_scores,
              ...(structuredData?.financials_metrics?.growth_scores || {})
            }
          },
          funding_rounds: {
            ...defaultData.funding_rounds,
            ...(structuredData?.funding_rounds || {})
          },
          contact_information: {
            ...defaultData.contact_information,
            ...(structuredData?.contact_information || {})
          }
        };
        mergedData.investors = Array.isArray(mergedData.investors) ? mergedData.investors : [];
        mergedData.news_press = Array.isArray(mergedData.news_press) ? mergedData.news_press : [];
        mergedData.acquisitions = Array.isArray(mergedData.acquisitions) ? mergedData.acquisitions : [];
        mergedData.customer_testimonials = Array.isArray(mergedData.customer_testimonials) ? mergedData.customer_testimonials : [];
        mergedData.company_overview.other_locations = Array.isArray(mergedData.company_overview.other_locations) ? mergedData.company_overview.other_locations : [];
        mergedData.company_overview.founders = Array.isArray(mergedData.company_overview.founders) ? mergedData.company_overview.founders : [];
        mergedData.company_overview.key_team_members = Array.isArray(mergedData.company_overview.key_team_members) ? mergedData.company_overview.key_team_members : [];
        mergedData.company_overview.unique_selling_points = Array.isArray(mergedData.company_overview.unique_selling_points) ? mergedData.company_overview.unique_selling_points : [];
        mergedData.company_overview.products_services = Array.isArray(mergedData.company_overview.products_services) ? mergedData.company_overview.products_services : [];
        mergedData.company_overview.main_competitors = Array.isArray(mergedData.company_overview.main_competitors) ? mergedData.company_overview.main_competitors : [];
        mergedData.company_overview.ip_trademarks = Array.isArray(mergedData.company_overview.ip_trademarks) ? mergedData.company_overview.ip_trademarks : [];
        mergedData.funding_rounds.rounds = Array.isArray(mergedData.funding_rounds.rounds) ? mergedData.funding_rounds.rounds : [];

        setAiSummary(mergedData);
        setError("");
      } catch (err: any) {
        console.error("[CompanyIntelligenceProfile] restructureAiData - Error:", err);
        setError(err.message || "Failed to process AI analysis");
        setAiSummary(null);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      setRawData("");
      setAiSummary(null);
      try {
        await fetchData();
        await fetchAiSummary();
      } catch (err) {
        console.error("[CompanyIntelligenceProfile] fetchAllData - General error during fetch sequence:", err);
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    if (currentJobId) {
      console.log("[CompanyIntelligenceProfile] useEffect - Proceeding to fetchAllData for job_id:", currentJobId);
      fetchAllData();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text c="red">Error: {error}</Text>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Tabs defaultValue="ai" keepMounted={false}>
        <Tabs.List style={{ marginBottom: "0.5rem" }}>
          <Tabs.Tab value="ai">AI Analysis</Tabs.Tab>
          <Tabs.Tab value="raw">Raw Data</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ai">
          {aiSummary ? (
            <CompanyIntelligenceProfileView data={aiSummary} />
          ) : (
            <Text>No AI analysis available. {error && `(Error: ${error})`}</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="raw">
          <Text style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
            {rawData || "No raw data available."}
          </Text>
        </Tabs.Panel>
      </Tabs>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Detailed View">
        <Text style={{ whiteSpace: "pre-wrap" }}>{modalContent}</Text>
      </Modal>
    </div>
  );
}

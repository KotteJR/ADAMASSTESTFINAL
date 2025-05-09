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

  useEffect(() => {
    const job_id = "5616a785-4ae7-4f5a-a778-12bb468ea537";
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
        .in("source", ["Crunchbase", "Tavily"])
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
        .in("source", ["Crunchbase"])
        .order("created_at", { ascending: false });

      if (error) {
        setError(`Error fetching AI analysis: ${error.message}`);
      } else {
        const aiText = data.map((d: any) => {
          try {
            return typeof d.data === "string" ? d.data : JSON.stringify(d.data, null, 2);
          } catch {
            return typeof d.data === "string" ? d.data : JSON.stringify(d.data, null, 2);
          }
        }).join("\n\n---\n\n") || "";
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
            context: "company_intelligence"
          })
        });

        if (!response.ok) {
          throw new Error("Failed to process AI data");
        }

        const { structuredData } = await response.json();
        
        // Ensure we have the required structure
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

        // Merge the received data with defaults
        const mergedData = {
          ...defaultData,
          ...structuredData,
          // Ensure nested objects are properly merged
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

        // Ensure arrays are properly initialized
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
      } catch (err) {
        console.error("Error restructuring AI data:", err);
        setError("Failed to process AI analysis");
      } finally {
        setLoading(false);
      }
    };

    const fetchAllData = async () => {
      try {
        await Promise.all([fetchData(), fetchAiSummary()]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAllData();
    hasFetched.current = true;
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text c="red">{error}</Text>;
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
            <Text>No AI analysis available.</Text>
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

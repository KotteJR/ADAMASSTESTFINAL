"use client";

import { Text, Title, Card, Group, Stack, Badge, Table, Grid, Paper, ThemeIcon, rem, Progress, Timeline, List, Avatar, RingProgress, Alert, Accordion, Divider, SimpleGrid, Box } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { 
  IconBuilding, IconUsers, IconChartBar, IconBuildingStore, IconChartLine, 
  IconBuildingBank, IconTrendingUp, IconTrendingDown, IconAward, IconBuildingCommunity,
  IconWorld, IconBrandLinkedin, IconBrandTwitter, IconMoneybag, IconChartPie,
  IconBuildingSkyscraper, IconDeviceAnalytics, IconNews, IconAlertTriangle,
  IconCheck, IconInfoCircle, IconChartArea, IconChartCandle, IconChartDots
} from "@tabler/icons-react";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const RevenueGrowthChart = dynamic(() => import('../../components/charts/RevenueGrowthChart'), { ssr: false });
const MarketPresenceMap = dynamic(() => import('../../components/charts/MarketPresenceMap'), { ssr: false });
const ProductPortfolioChart = dynamic(() => import('../../components/charts/ProductPortfolioChart'), { ssr: false });
const InvestmentHistoryChart = dynamic(() => import('../../components/charts/InvestmentHistoryChart'), { ssr: false });

interface CompanyIntelligenceProfileViewProps {
  data: {
    company_overview: {
      official_company_name: string;
      website: string;
      overview: string;
      industry: string;
      headquarters: string;
      other_locations: string[];
      founding_date: string;
      founders: Array<{ name: string; role: string }>;
      key_team_members: any[];
      number_of_employees: number;
      company_mission: string;
      unique_selling_points: string[];
      products_services: string[];
      main_competitors: string[];
      ip_trademarks: string[];
    };
    financials_metrics: {
      revenue: number | null;
      profit: number | null;
      ebitda: number | null;
      it_spend: number | null;
      web_visits: number | null;
      growth_scores: {
        [key: string]: string;
      };
      active_website_tech_count: number | null;
      growth_percentages: {
        revenue: number | null;
        profit: number | null;
        ebitda: number | null;
      };
      financial_commentary: string;
    };
    funding_rounds: {
      rounds: Array<{
        round_name: string;
        date: string;
        amount_raised: string;
        number_of_investors: number;
        lead_investors: string[];
        all_investors: string[];
        percent_increase_from_previous?: number;
      }>;
      total_funding_amount: string;
      funding_commentary: string;
    };
    investors: string[];
    news_press: Array<{
      date: string;
      headline: string;
      publication: string;
      summary: string;
      link: string;
    }>;
    acquisitions: any[];
    customer_testimonials: any[];
    contact_information: {
      email: string | null;
      phone: string | null;
      address: string;
      other: {
        [key: string]: string;
      };
    };
    news_trends: string;
    graph_data: any;
  };
}

export function CompanyIntelligenceProfileView({ data }: CompanyIntelligenceProfileViewProps) {
  const overview = data.company_overview || {};
  const financials = data.financials_metrics || {};
  const funding = data.funding_rounds || {};
  const investors = data.investors || [];
  const news = data.news_press || [];
  const contact = data.contact_information || {};
  const team = overview.key_team_members || [];
  const founders = overview.founders || [];
  const growthPercentages = financials.growth_percentages || {};
  const financialCommentary = financials.financial_commentary || "";
  const fundingCommentary = funding.funding_commentary || "";
  const newsTrends = data.news_trends || "";
  const graphData = data.graph_data || {};

  // --- Market Presence Data Assembly ---
  const marketPresence = useMemo(() => {
    const hq = overview.headquarters;
    const others = (overview.other_locations || []).filter(loc => loc && loc !== hq);
    const arr = [];
    if (hq) arr.push({ location: hq, type: 'headquarters' });
    arr.push(...others.map(loc => ({ location: loc, type: 'market' })));
    return arr;
  }, [overview.headquarters, overview.other_locations]);

  return (
    <Box style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 0", background: "#fff", fontFamily: 'Inter, Roboto, Helvetica Neue, Arial, system-ui, sans-serif' }}>
      {/* Header Section */}
      <Box mb={32}>
        <Title order={2} mb={4} style={{ color: "#1a202c", fontWeight: 700, fontSize: 28, textAlign: "left" }}>{overview.official_company_name || "No data available"}</Title>
        <Text size="md" color="dimmed" mb={8}>{overview.overview || "No data available"}</Text>
        <Group gap={8} mb={8}>
          {overview.industry && <Badge color="blue" size="lg">{overview.industry}</Badge>}
          {funding.total_funding_amount && <Badge color="yellow" size="lg">Funding: {funding.total_funding_amount}</Badge>}
          {overview.headquarters && <Badge color="gray" size="lg">{overview.headquarters}</Badge>}
        </Group>
      </Box>
      <Divider my={24} />
      {/* Key Stats */}
      <SimpleGrid cols={3} spacing="lg" mb={32}>
        <Box>
          <Text size="sm" color="dimmed">Employees</Text>
          <Text fw={700} size="xl">{overview.number_of_employees ?? "No data available"}</Text>
        </Box>
        <Box>
          <Text size="sm" color="dimmed">Revenue</Text>
          <Text fw={700} size="xl">{financials.revenue ?? "No data available"}</Text>
        </Box>
        <Box>
          <Text size="sm" color="dimmed">Founded</Text>
          <Text fw={700} size="xl">{overview.founding_date || "No data available"}</Text>
        </Box>
      </SimpleGrid>
      <Divider my={24} />
      {/* Company Mission & Unique Selling Points */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Mission</Title>
        <Text mb={8}>{overview.company_mission || "No data available"}</Text>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Unique Selling Points</Title>
        <List spacing="xs">
          {(overview.unique_selling_points && overview.unique_selling_points.length > 0)
            ? overview.unique_selling_points.map((usp, idx) => <List.Item key={idx}>{usp}</List.Item>)
            : <List.Item>No data available</List.Item>}
        </List>
      </Box>
      <Divider my={24} />
      {/* Products & Competitors */}
      <SimpleGrid cols={2} spacing="lg" mb={32}>
        <Box>
          <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Products & Services</Title>
          <List spacing="xs">
            {(overview.products_services && overview.products_services.length > 0)
              ? overview.products_services.map((prod, idx) => <List.Item key={idx}>{prod}</List.Item>)
              : <List.Item>No data available</List.Item>}
          </List>
        </Box>
        <Box>
          <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Main Competitors</Title>
          <List spacing="xs">
            {(overview.main_competitors && overview.main_competitors.length > 0)
              ? overview.main_competitors.map((comp, idx) => <List.Item key={idx}>{comp}</List.Item>)
              : <List.Item>No data available</List.Item>}
          </List>
        </Box>
      </SimpleGrid>
      <Divider my={24} />
      {/* Financials Growth & Commentary */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Financial Trends & Growth</Title>
        <SimpleGrid cols={3} spacing="lg" mb={8}>
          <Box>
            <Text size="sm" color="dimmed">Latest Revenue</Text>
            <Text fw={700} size="lg">{growthPercentages.revenue ? `${growthPercentages.revenue}%` : "No data available"}</Text>
          </Box>
          <Box>
            <Text size="sm" color="dimmed">Latest Profit</Text>
            <Text fw={700} size="lg">{growthPercentages.profit ? `${growthPercentages.profit}%` : "No data available"}</Text>
          </Box>
          <Box>
            <Text size="sm" color="dimmed">Latest EBITDA</Text>
            <Text fw={700} size="lg">{growthPercentages.ebitda ? `${growthPercentages.ebitda}%` : "No data available"}</Text>
          </Box>
        </SimpleGrid>
        {financialCommentary && <Text size="sm" color="dimmed" mt={4}>{financialCommentary}</Text>}
      </Box>
      <Divider my={24} />
      {/* Key Business Graphs Section */}
      <Box mb={32}>
        <Title order={3} mb={16} style={{ color: "#003366", fontWeight: 700 }}>Key Business Graphs</Title>
        <SimpleGrid cols={1} spacing={32}>
          <Box>
            <Title order={5} mb={8} style={{ color: "#1a202c", fontWeight: 600 }}>Revenue Growth</Title>
            <RevenueGrowthChart data={graphData.revenue_growth} />
          </Box>
          <Box>
            <Title order={5} mb={8} style={{ color: "#1a202c", fontWeight: 600 }}>Investment History</Title>
            <InvestmentHistoryChart data={graphData.investment_history} />
          </Box>
          <Box>
            <Title order={5} mb={8} style={{ color: "#1a202c", fontWeight: 600 }}>Market Presence</Title>
            <MarketPresenceMap data={marketPresence} />
          </Box>
        </SimpleGrid>
      </Box>
      <Divider my={24} />
      {/* Funding Timeline & Commentary */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Funding Timeline</Title>
        {funding.rounds && funding.rounds.length > 0 ? (
          <Timeline active={funding.rounds.length - 1} bulletSize={24} lineWidth={2}>
            {funding.rounds.map((round, idx) => (
              <Timeline.Item
                key={idx}
                bullet={<IconMoneybag size={16} />}
                title={round.round_name || "-"}
              >
                <Text size="sm" mt={4}>Amount: {round.amount_raised || "-"}</Text>
                <Text size="sm" mt={4}>Date: {round.date || "-"}</Text>
                <Text size="sm" mt={4}>Lead: {(round.lead_investors && round.lead_investors.length > 0) ? round.lead_investors.join(", ") : "-"}</Text>
                {typeof round.percent_increase_from_previous !== 'undefined' && (
                  <Text size="xs" color="green" mt={4}>Increase from previous: {round.percent_increase_from_previous}%</Text>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
        ) : <Text>No funding rounds available</Text>}
        {fundingCommentary && <Text size="sm" color="dimmed" mt={8}>{fundingCommentary}</Text>}
      </Box>
      <Divider my={24} />
      {/* Investors */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Key Investors</Title>
        <List spacing="xs">
          {(investors && investors.length > 0)
            ? investors.map((inv, idx) => <List.Item key={idx}>{inv}</List.Item>)
            : <List.Item>No data available</List.Item>}
        </List>
      </Box>
      <Divider my={24} />
      {/* News Trends */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Recent News & Press</Title>
        {newsTrends && <Text size="sm" color="dimmed" mb={8}>{newsTrends}</Text>}
        <Stack gap={16}>
          {(news && news.length > 0)
            ? news.map((item, idx) => (
              <Box key={idx} style={{ background: "#f9f9f9", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
                <Text fw={500}>{item.headline || "No headline"}</Text>
                <Text size="sm" color="dimmed">{item.summary || "No summary available"}</Text>
                <Group gap={8}>
                  <Text size="xs" color="dimmed">{item.date || "No date"}</Text>
                  {item.link && <Text size="xs" color="blue" component="a" href={item.link} target="_blank">Read more</Text>}
                </Group>
              </Box>
            ))
            : <Text>No recent news available</Text>}
        </Stack>
      </Box>
      <Divider my={24} />
      {/* Contact & Team */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Contact Information</Title>
        <List spacing="xs">
          <List.Item>Email: {contact.email || "No data available"}</List.Item>
          <List.Item>Phone: {contact.phone || "No data available"}</List.Item>
          <List.Item>Address: {contact.address || "No data available"}</List.Item>
        </List>
      </Box>
      <Divider my={24} />
      {/* Team & Founders */}
      <Box mb={32}>
        <Title order={4} mb={8} style={{ color: "#003366", fontWeight: 600 }}>Founders</Title>
        <List spacing="xs">
          {(founders && founders.length > 0)
            ? founders.map((f, idx) => <List.Item key={idx}>{f.name ? `${f.name}${f.role ? ` (${f.role})` : ""}` : "No data available"}</List.Item>)
            : <List.Item>No data available</List.Item>}
        </List>
        <Title order={4} mb={8} mt={16} style={{ color: "#003366", fontWeight: 600 }}>Key Team Members</Title>
        <List spacing="xs">
          {(team && team.length > 0)
            ? team.map((m, idx) => <List.Item key={idx}>{m.name ? `${m.name}${m.role ? ` (${m.role})` : ""}` : "No data available"}</List.Item>)
            : <List.Item>No data available</List.Item>}
        </List>
      </Box>
    </Box>
  );
} 
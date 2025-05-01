"use client";

import { Text, Title, Card, Group, Stack, Badge, Table, Grid, Paper, ThemeIcon, rem, Progress, Timeline, List, Avatar, RingProgress, Alert, Accordion, Divider, SimpleGrid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { 
  IconBuilding, IconUsers, IconChartBar, IconBuildingStore, IconChartLine, 
  IconBuildingBank, IconTrendingUp, IconTrendingDown, IconAward, IconBuildingCommunity,
  IconWorld, IconBrandLinkedin, IconBrandTwitter, IconMoneybag, IconChartPie,
  IconBuildingSkyscraper, IconDeviceAnalytics, IconNews, IconAlertTriangle,
  IconCheck, IconInfoCircle, IconChartArea, IconChartCandle, IconChartDots
} from "@tabler/icons-react";
import dynamic from 'next/dynamic';

const RevenueGrowthChart = dynamic(() => import('../../components/charts/RevenueGrowthChart'), { ssr: false });
const MarketPresenceMap = dynamic(() => import('../../components/charts/MarketPresenceMap'), { ssr: false });
const ProductPortfolioChart = dynamic(() => import('../../components/charts/ProductPortfolioChart'), { ssr: false });
const InvestmentHistoryChart = dynamic(() => import('../../components/charts/InvestmentHistoryChart'), { ssr: false });

interface Founder {
  name: string;
  role: string;
}

interface FundingRound {
  round_name: string;
  date: string;
  amount_raised: string;
  number_of_investors: number;
  lead_investors: string[];
  all_investors: string[];
}

interface NewsArticle {
  date: string;
  headline: string;
  publication: string;
  summary: string;
  link: string;
}

interface CompanyData {
  company_overview: {
    official_company_name: string;
    website: string;
    overview: string;
    industry: string;
    headquarters: string;
    other_locations: string[];
    founding_date: string;
    founders: Founder[];
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
  };
  funding_rounds: {
    rounds: FundingRound[];
    total_funding_amount: string;
  };
  investors: string[];
  news_press: NewsArticle[];
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
}

// Mock data for demonstration
const mockData: CompanyData = {
  company_overview: {
    official_company_name: "Insify",
    website: "https://www.insify.eu",
    overview: "Insify is a Netherlands-based InsurTech startup that provides fully digital insurance solutions tailored for freelancers and small-to-medium enterprises (SMEs). It simplifies the insurance process with online efficiency, offering customizable coverage without hidden fees.",
    industry: "Insurance/InsurTech",
    headquarters: "Amsterdam, Netherlands",
    other_locations: ["Amsterdam-Noord, Amsterdam, Netherlands", "France", "Germany"],
    founding_date: "2020",
    founders: [
      {
        name: "Koen Thijssen",
        role: "CEO"
      }
    ],
    key_team_members: [],
    number_of_employees: 55,
    company_mission: "To simplify and modernize business insurance for entrepreneurs through digital-first solutions.",
    unique_selling_points: [
      "Fully digital platform with no advisory fees",
      "Policies refreshed automatically via data analytics",
      "Tailored coverage for SMEs and freelancers",
      "Partnerships with Munich Re and iptiQ for underwriting",
      "2-minute quote process (vs. industry-standard weeks)"
    ],
    products_services: [
      "Occupational Disability Insurance (AOV)",
      "Business Liability Insurance",
      "Professional Liability Insurance",
      "Business Assets Insurance",
      "Disability Income Protection (via iptiQ partnership)"
    ],
    main_competitors: ["Orus", "Assurup", "Olino"],
    ip_trademarks: []
  },
  financials_metrics: {
    revenue: null,
    profit: null,
    ebitda: null,
    it_spend: null,
    web_visits: null,
    growth_scores: {
      "2022": "233% revenue growth",
      "2023": "154% revenue growth"
    },
    active_website_tech_count: null
  },
  funding_rounds: {
    rounds: [
      {
        round_name: "Series A",
        date: "2022-02-10",
        amount_raised: "€15 million",
        number_of_investors: 4,
        lead_investors: ["Accel"],
        all_investors: ["Accel", "Frontline Ventures", "Visionaries Club", "Fly Ventures"]
      },
      {
        round_name: "Series A Extension",
        date: "2023-06-07",
        amount_raised: "€10 million",
        number_of_investors: 6,
        lead_investors: ["Munich Re Ventures"],
        all_investors: [
          "Munich Re Ventures",
          "Accel",
          "Frontline Ventures",
          "Visionaries Club",
          "Nico Rosberg",
          "Opera Tech Ventures"
        ]
      }
    ],
    total_funding_amount: "€25 million"
  },
  investors: [
    "Accel",
    "Munich Re Ventures",
    "Frontline Ventures",
    "Visionaries Club",
    "Fly Ventures",
    "Nico Rosberg",
    "Opera Tech Ventures"
  ],
  news_press: [
    {
      date: "2023-06-08",
      headline: "Insurtech Firm Insify Adds Nico Rosberg to Its Slipstream and Puts an Extra €10 Million in the Tank",
      publication: "Tech.eu",
      summary: "Insify secured €10 million Series A extension to expand in Germany/France and develop new products.",
      link: "https://tech.eu/2023/06/08/insrtech-firm-insify-adds-nico-rosberg-to-its-slipstream-and-puts-an-extra-10-million-in-the-tank/"
    },
    {
      date: "2023-07-27",
      headline: "Helping Close the Income Protection Gap for Entrepreneurs",
      publication: "iptiQ",
      summary: "Launched disability income protection product via partnership with Swiss Re's iptiQ.",
      link: "https://www.iptiq.com/case-studies/helping-close-income-protection-gap-entrepreneurs-insify-iptiq.html"
    }
  ],
  acquisitions: [],
  customer_testimonials: [],
  contact_information: {
    email: null,
    phone: null,
    address: "Amsterdam, Netherlands",
    other: {
      "LinkedIn": "https://www.linkedin.com/company/insify-insurance/"
    }
  }
};

// Enhanced analysis helper functions
const getRiskLevel = (data: CompanyData) => {
  const risks = [];
  const metrics = data.financials_metrics;
  const overview = data.company_overview;

  // Growth Risk Analysis
  if (metrics.growth_scores["2023"] && metrics.growth_scores["2022"]) {
    const growth2023 = parseInt(metrics.growth_scores["2023"].split('%')[0]);
    const growth2022 = parseInt(metrics.growth_scores["2022"].split('%')[0]);
    if (growth2023 < growth2022) {
      risks.push({
        severity: 'high',
        risk: 'Declining Growth Rate',
        analysis: `Growth rate has decreased from ${growth2022}% to ${growth2023}%, indicating potential market saturation or increased competition.`
      });
    }
  }

  // Market Competition Risk
  if (overview.main_competitors.length > 2) {
    risks.push({
      severity: 'medium',
      risk: 'High Competition',
      analysis: `Operating in a crowded market with ${overview.main_competitors.length} main competitors, requiring strong differentiation strategy.`
    });
  }

  // Geographic Concentration Risk
  if (overview.other_locations.length < 3) {
    risks.push({
      severity: 'medium',
      risk: 'Geographic Concentration',
      analysis: 'Limited geographic diversification increases exposure to regional market fluctuations.'
    });
  }

  // Product Portfolio Risk
  if (overview.products_services.length < 4) {
    risks.push({
      severity: 'medium',
      risk: 'Limited Product Diversification',
      analysis: 'Narrow product portfolio may limit growth opportunities and increase vulnerability to market changes.'
    });
  }

  // Financial Transparency Risk
  if (metrics.revenue === null || metrics.profit === null) {
    risks.push({
      severity: 'high',
      risk: 'Limited Financial Transparency',
      analysis: 'Lack of financial data transparency makes it difficult to assess true financial health and sustainability.'
    });
  }

  return risks;
};

const getOpportunities = (data: CompanyData) => {
  const opportunities = [];
  const overview = data.company_overview;
  const metrics = data.financials_metrics;
  const funding = data.funding_rounds;

  // Geographic Expansion
  if (overview.other_locations.length < 4) {
    opportunities.push({
      type: 'Market Expansion',
      opportunity: 'Geographic Expansion Potential',
      analysis: `Current presence in ${overview.other_locations.length} regions presents opportunity for market expansion, particularly in untapped European markets.`,
      impact: 'High'
    });
  }

  // Product Development
  if (overview.products_services.length < 6) {
    opportunities.push({
      type: 'Product Development',
      opportunity: 'Product Portfolio Expansion',
      analysis: `Current offering of ${overview.products_services.length} products leaves room for expansion into adjacent insurance categories.`,
      impact: 'High'
    });
  }

  // Growth Investment
  if (funding.rounds.length > 0) {
    const lastRound = funding.rounds[funding.rounds.length - 1];
    opportunities.push({
      type: 'Investment',
      opportunity: 'Growth Capital Utilization',
      analysis: `Recent ${lastRound.amount_raised} funding provides opportunity for strategic investments in technology and market expansion.`,
      impact: 'High'
    });
  }

  // Digital Transformation
  if (metrics.active_website_tech_count === null || metrics.active_website_tech_count < 10) {
    opportunities.push({
      type: 'Technology',
      opportunity: 'Digital Infrastructure Enhancement',
      analysis: 'Opportunity to strengthen digital capabilities and improve customer experience through technology investments.',
      impact: 'Medium'
    });
  }

  return opportunities;
};

const getCompetitiveAnalysis = (data: CompanyData) => {
  const overview = data.company_overview;
  const metrics = data.financials_metrics;

  return {
    strengths: [
      {
        factor: 'Market Position',
        analysis: `Strong position in ${overview.industry} with unique focus on ${overview.products_services[0]}.`,
        impact: 'High'
      },
      {
        factor: 'Product Portfolio',
        analysis: `Diversified offering with ${overview.products_services.length} specialized insurance products.`,
        impact: 'Medium'
      },
      {
        factor: 'Growth Trajectory',
        analysis: metrics.growth_scores["2023"] 
          ? `Demonstrated strong growth with ${metrics.growth_scores["2023"]} in 2023.`
          : 'Established market presence with steady growth.',
        impact: 'High'
      },
      {
        factor: 'Strategic Partnerships',
        analysis: 'Strong backing from industry leaders and strategic investors.',
        impact: 'High'
      }
    ],
    weaknesses: [
      {
        factor: 'Market Coverage',
        analysis: `Limited presence with operations in ${overview.other_locations.length} regions.`,
        impact: 'Medium'
      },
      {
        factor: 'Financial Transparency',
        analysis: metrics.revenue === null 
          ? 'Limited financial data transparency affects stakeholder confidence.'
          : 'Moderate financial performance visibility.',
        impact: 'High'
      },
      {
        factor: 'Competition',
        analysis: `Faces competition from ${overview.main_competitors.length} established players in the market.`,
        impact: 'Medium'
      }
    ].filter(w => w !== null),
  };
};

const getMarketAnalysis = (data: CompanyData) => {
  const overview = data.company_overview;
  const metrics = data.financials_metrics;

  return {
    marketSize: {
      analysis: `Operating in the ${overview.industry} sector with significant growth potential.`,
      trend: metrics.growth_scores["2023"] ? "Expanding" : "Stable",
      opportunities: overview.other_locations.length < 3 ? "High geographic expansion potential" : "Established market presence"
    },
    competitiveLandscape: {
      analysis: `Competing with ${overview.main_competitors.length} major players including ${overview.main_competitors.join(', ')}.`,
      positioning: overview.unique_selling_points.length > 3 ? "Strong competitive advantages" : "Developing market position",
      barriers: [
        "Regulatory compliance requirements",
        "Technology infrastructure investment",
        "Customer trust and brand recognition",
        "Strategic partnerships"
      ]
    },
    growthDrivers: {
      primary: [
        "Digital transformation in insurance sector",
        "Growing SME insurance needs",
        "Increasing demand for specialized coverage",
        "Market expansion opportunities"
      ],
      challenges: [
        "Regulatory compliance costs",
        "Customer acquisition in new markets",
        "Technology infrastructure scaling",
        "Competition from established players"
      ]
    }
  };
};

const getFinancialAnalysis = (data: CompanyData) => {
  const metrics = data.financials_metrics;
  const funding = data.funding_rounds;

  return {
    growthMetrics: {
      analysis: Object.entries(metrics.growth_scores).map(([year, score]) => ({
        year,
        score,
        analysis: `${year}: ${score} indicates ${parseInt(score) > 100 ? "strong" : "moderate"} market performance`
      }))
    },
    fundingEfficiency: {
      totalRaised: funding.total_funding_amount,
      rounds: funding.rounds.length,
      analysis: `Successfully raised ${funding.total_funding_amount} across ${funding.rounds.length} rounds, demonstrating strong investor confidence`,
      efficiency: funding.rounds.length > 1 ? "Efficient capital raising strategy" : "Early-stage funding success"
    },
    operationalMetrics: {
      employeeProductivity: data.company_overview.number_of_employees > 0 
        ? "Established operational scale"
        : "Early stage operations",
      marketExpansion: `Present in ${data.company_overview.other_locations.length} markets`,
      analysis: "Demonstrating operational efficiency with room for scale"
    }
  };
};

export function CompanyIntelligenceProfile() {
  const risks = getRiskLevel(mockData);
  const opportunities = getOpportunities(mockData);
  const competitiveAnalysis = getCompetitiveAnalysis(mockData);
  const marketAnalysis = getMarketAnalysis(mockData);
  const financialAnalysis = getFinancialAnalysis(mockData);

  return (
    <div style={{ padding: "1rem" }}>
      <Stack gap="xl">
        {/* Header Section with Quick Stats */}
        <Card withBorder>
          <Group justify="space-between" align="flex-start" mb="xl">
            <Stack gap="xs">
              <Group>
                <Avatar size="xl" src="/company-logo.png" alt="Company Logo" />
                <div>
                  <Title order={2}>{mockData.company_overview.official_company_name}</Title>
                  <Text size="sm" c="dimmed" mt="xs" maw={600}>{mockData.company_overview.overview}</Text>
                </div>
              </Group>
            </Stack>
            <Group gap="xs">
              <Badge size="lg" variant="light" color="blue">{mockData.company_overview.industry}</Badge>
              <Badge size="lg" variant="light" color="green">Series A</Badge>
              <Badge size="lg" variant="light" color="yellow">{mockData.funding_rounds.total_funding_amount}</Badge>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            <Paper withBorder p="md" radius="md">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                  <IconChartLine style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Revenue Growth</Text>
                  <Text fw={700} size="xl">{mockData.financials_metrics.growth_scores["2023"]}</Text>
                </div>
              </Group>
              <Text size="xs" c="dimmed" mt="sm">
                {parseInt(mockData.financials_metrics.growth_scores["2023"]) > 100 ? "Exceptional growth rate" : "Solid growth rate"}
              </Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light" color="green">
                  <IconUsers style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Team Size</Text>
                  <Text fw={700} size="xl">{mockData.company_overview.number_of_employees}</Text>
                </div>
              </Group>
              <Text size="xs" c="dimmed" mt="sm">
                {mockData.company_overview.number_of_employees > 50 ? "Scale-up phase" : "Growth phase"}
              </Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light" color="violet">
                  <IconBuildingStore style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Products</Text>
                  <Text fw={700} size="xl">{mockData.company_overview.products_services.length}</Text>
                </div>
              </Group>
              <Text size="xs" c="dimmed" mt="sm">
                Diverse insurance portfolio
              </Text>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Group>
                <ThemeIcon size="lg" radius="md" variant="light" color="orange">
                  <IconWorld style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Markets</Text>
                  <Text fw={700} size="xl">{mockData.company_overview.other_locations.length}</Text>
                </div>
              </Group>
              <Text size="xs" c="dimmed" mt="sm">
                European market presence
              </Text>
            </Paper>
          </SimpleGrid>
        </Card>

        {/* Strategic Overview */}
        <Card withBorder>
          <Title order={3} mb="xl">Strategic Overview</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                <Text>
                  {mockData.company_overview.official_company_name} demonstrates 
                  {mockData.financials_metrics.growth_scores["2023"] ? " exceptional" : " solid"} performance 
                  in the {mockData.company_overview.industry} sector, with a clear focus on digital transformation 
                  and market expansion.
                </Text>
                
                <div>
                  <Text fw={500} mb="xs">Core Strengths</Text>
                  <List spacing="xs">
                    {mockData.company_overview.unique_selling_points.map((point, index) => (
                      <List.Item key={index}>
                        <Text size="sm">{point}</Text>
                      </List.Item>
                    ))}
                  </List>
                </div>

                <div>
                  <Text fw={500} mb="xs">Market Position</Text>
                  <Text size="sm">
                    Leading provider in {mockData.company_overview.headquarters} with expansion into 
                    {mockData.company_overview.other_locations.length} markets. The company's digital-first 
                    approach and partnership with {mockData.funding_rounds.rounds[0].lead_investors[0]} 
                    positions it strongly against competitors like {mockData.company_overview.main_competitors.join(', ')}.
                  </Text>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card withBorder h="100%">
                <Title order={5} mb="md">Performance Indicators</Title>
                {Object.entries(mockData.financials_metrics.growth_scores).map(([year, score]) => (
                  <div key={year} style={{ marginBottom: '1rem' }}>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">{year}</Text>
                      <Badge variant="light" color={parseInt(score) > 200 ? "green" : "blue"}>{score}</Badge>
                    </Group>
                    <Progress 
                      value={parseInt(score)} 
                      color={parseInt(score) > 200 ? "green" : "blue"} 
                      size="sm" 
                    />
                  </div>
                ))}
                <Divider my="md" />
                <Text size="sm" c="dimmed">
                  Growth trajectory indicates strong market validation and effective execution of business strategy.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Interactive Metrics Dashboard */}
        <Card withBorder>
          <Title order={3} mb="xl">Performance Analytics</Title>
          <Carousel
            withIndicators
            height={400}
            slideSize="100%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            controlsOffset="xs"
            controlSize={32}
            styles={{
              control: {
                backgroundColor: 'var(--mantine-color-blue-filled)',
                border: 'none',
                color: 'white',
                '&[data-inactive]': {
                  opacity: 0.5,
                  cursor: 'default',
                },
              },
              indicator: {
                width: 12,
                height: 4,
                transition: 'width 250ms ease',
                backgroundColor: 'var(--mantine-color-blue-filled)',
                '&[data-active]': {
                  width: 40,
                },
              },
            }}
          >
            {/* Revenue Growth Chart */}
            <Carousel.Slide>
              <Paper p="xl" radius="md" withBorder>
                <Group mb="xl">
                  <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                    <IconChartLine style={{ width: rem(24), height: rem(24) }} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500} size="lg">Revenue Growth Trajectory</Text>
                    <Text size="sm" c="dimmed">Year-over-Year Performance</Text>
                  </div>
                </Group>
                <div style={{ height: 250, position: 'relative' }}>
                  <RevenueGrowthChart />
                </div>
                <Text size="sm" c="dimmed" mt="md" ta="center">
                  Showing exceptional growth with {mockData.financials_metrics.growth_scores["2023"]} in 2023, 
                  down from {mockData.financials_metrics.growth_scores["2022"]} in 2022
                </Text>
              </Paper>
            </Carousel.Slide>

            {/* Market Presence Map */}
            <Carousel.Slide>
              <Paper p="xl" radius="md" withBorder>
                <Group mb="xl">
                  <ThemeIcon size="xl" radius="md" variant="light" color="green">
                    <IconWorld style={{ width: rem(24), height: rem(24) }} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500} size="lg">Geographic Market Presence</Text>
                    <Text size="sm" c="dimmed">Regional Distribution</Text>
                  </div>
                </Group>
                <div style={{ height: 250, position: 'relative' }}>
                  <MarketPresenceMap />
                </div>
                <Text size="sm" c="dimmed" mt="md" ta="center">
                  Operating across {mockData.company_overview.other_locations.length} key markets, 
                  with headquarters in {mockData.company_overview.headquarters}
                </Text>
              </Paper>
            </Carousel.Slide>

            {/* Product Portfolio Analysis */}
            <Carousel.Slide>
              <Paper p="xl" radius="md" withBorder>
                <Group mb="xl">
                  <ThemeIcon size="xl" radius="md" variant="light" color="violet">
                    <IconBuildingStore style={{ width: rem(24), height: rem(24) }} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500} size="lg">Product Portfolio Analysis</Text>
                    <Text size="sm" c="dimmed">Service Distribution</Text>
                  </div>
                </Group>
                <div style={{ height: 250, position: 'relative' }}>
                  <ProductPortfolioChart />
                </div>
                <Text size="sm" c="dimmed" mt="md" ta="center">
                  Diverse portfolio of {mockData.company_overview.products_services.length} insurance products, 
                  focused on {mockData.company_overview.products_services[0]}
                </Text>
              </Paper>
            </Carousel.Slide>

            {/* Investment Timeline */}
            <Carousel.Slide>
              <Paper p="xl" radius="md" withBorder>
                <Group mb="xl">
                  <ThemeIcon size="xl" radius="md" variant="light" color="orange">
                    <IconMoneybag style={{ width: rem(24), height: rem(24) }} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500} size="lg">Investment History</Text>
                    <Text size="sm" c="dimmed">Funding Rounds Timeline</Text>
                  </div>
                </Group>
                <div style={{ height: 250, position: 'relative' }}>
                  <InvestmentHistoryChart />
                </div>
                <Text size="sm" c="dimmed" mt="md" ta="center">
                  Total funding of {mockData.funding_rounds.total_funding_amount} across {mockData.funding_rounds.rounds.length} rounds
                </Text>
              </Paper>
            </Carousel.Slide>
          </Carousel>
        </Card>

        {/* Market & Competition Analysis */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder>
            <Title order={3} mb="xl">Market Analysis</Title>
            <Stack gap="md">
              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">Market Dynamics</Text>
                <Text size="sm">
                  Operating in a {marketAnalysis.marketSize.trend.toLowerCase()} market with 
                  {mockData.company_overview.main_competitors.length > 3 ? " high" : " moderate"} competition. 
                  The company's digital-first approach provides a significant competitive advantage.
                </Text>
                <Group gap="xs" mt="md">
                  <Badge variant="light" color="blue">
                    {marketAnalysis.marketSize.opportunities}
                  </Badge>
                  <Badge variant="light" color="green">
                    {marketAnalysis.competitiveLandscape.positioning}
                  </Badge>
                </Group>
              </Paper>

              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">Growth Drivers</Text>
                <SimpleGrid cols={2} spacing="md">
                  {marketAnalysis.growthDrivers.primary.map((driver, index) => (
                    <Paper key={index} withBorder p="xs" radius="md">
                      <Text size="sm">{driver}</Text>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Paper>

              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">Market Entry Analysis</Text>
                <Grid>
                  {marketAnalysis.competitiveLandscape.barriers.map((barrier, index) => (
                    <Grid.Col key={index} span={6}>
                      <Paper withBorder p="xs" radius="md">
                        <Text size="sm">{barrier}</Text>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </Paper>
            </Stack>
          </Card>

          <Card withBorder>
            <Title order={3} mb="xl">Competitive Position</Title>
            <Stack gap="md">
              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">Competitive Advantages</Text>
                <List spacing="xs">
                  {competitiveAnalysis.strengths.map((strength, index) => (
                    <List.Item key={index}>
                      <Text fw={500} size="sm">{strength.factor}</Text>
                      <Text size="sm" c="dimmed">{strength.analysis}</Text>
                      <Badge size="sm" variant="light" color="blue" mt={4}>Impact: {strength.impact}</Badge>
                    </List.Item>
                  ))}
                </List>
              </Paper>

              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">Areas for Improvement</Text>
                <List spacing="xs">
                  {competitiveAnalysis.weaknesses.map((weakness, index) => (
                    <List.Item key={index}>
                      <Text fw={500} size="sm">{weakness.factor}</Text>
                      <Text size="sm" c="dimmed">{weakness.analysis}</Text>
                      <Badge size="sm" variant="light" color="red" mt={4}>Impact: {weakness.impact}</Badge>
                    </List.Item>
                  ))}
                </List>
              </Paper>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Investment Analysis */}
        <Card withBorder>
          <Title order={3} mb="xl">Investment Profile</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                <Text>
                  Total funding of {mockData.funding_rounds.total_funding_amount} raised across 
                  {mockData.funding_rounds.rounds.length} rounds, demonstrating strong investor confidence 
                  and effective capital deployment.
                </Text>

                <Timeline active={mockData.funding_rounds.rounds.length - 1} bulletSize={24} lineWidth={2}>
                  {mockData.funding_rounds.rounds.map((round, index) => (
                    <Timeline.Item
                      key={index}
                      bullet={<IconMoneybag size={12} />}
                      title={round.round_name}
                    >
                      <Text size="sm" mt={4}>Amount: {round.amount_raised}</Text>
                      <Text size="sm" mt={4}>Lead: {round.lead_investors.join(', ')}</Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {index > 0 
                          ? `${(parseInt(round.amount_raised.replace('€', '').replace(' million', '')) / 
                              parseInt(mockData.funding_rounds.rounds[index-1].amount_raised.replace('€', '').replace(' million', '')) * 100 - 100).toFixed(1)}% 
                              increase from previous round` 
                          : 'Initial institutional funding'}
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                <Paper withBorder p="md" radius="md">
                  <Text fw={500} mb="xs">Investment Efficiency</Text>
                  <Text size="sm">{financialAnalysis.fundingEfficiency.analysis}</Text>
                  <Badge variant="light" color="green" mt="xs">
                    {financialAnalysis.fundingEfficiency.efficiency}
                  </Badge>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Text fw={500} mb="xs">Key Investors</Text>
                  <List size="sm" spacing="xs">
                    {mockData.investors.map((investor, index) => (
                      <List.Item key={index}>{investor}</List.Item>
                    ))}
                  </List>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Text fw={500} mb="xs">Capital Allocation</Text>
                  <Text size="sm">
                    Primary focus on {marketAnalysis.growthDrivers.primary[0].toLowerCase()} and 
                    {marketAnalysis.growthDrivers.primary[1].toLowerCase()}.
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Risk Assessment */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder>
            <Title order={3} mb="xl">Risk Analysis</Title>
            <Stack gap="md">
              {risks.map((risk, index) => (
                <Paper key={index} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{risk.risk}</Text>
                    <Badge 
                      variant="light" 
                      color={risk.severity === 'high' ? 'red' : 'orange'}
                    >
                      {risk.severity} risk
                    </Badge>
                  </Group>
                  <Text size="sm">{risk.analysis}</Text>
                </Paper>
              ))}
            </Stack>
          </Card>

          <Card withBorder>
            <Title order={3} mb="xl">Growth Opportunities</Title>
            <Stack gap="md">
              {opportunities.map((opportunity, index) => (
                <Paper key={index} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="xs">
                    <Text fw={500}>{opportunity.opportunity}</Text>
                    <Badge 
                      variant="light" 
                      color={opportunity.impact === 'High' ? 'green' : 'blue'}
                    >
                      {opportunity.impact} impact
                    </Badge>
                  </Group>
                  <Text size="sm">{opportunity.analysis}</Text>
                </Paper>
              ))}
            </Stack>
          </Card>
        </SimpleGrid>

        {/* News & Updates */}
        <Card withBorder>
          <Title order={3} mb="xl">Recent Developments</Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {mockData.news_press.map((news, index) => (
              <Paper key={index} withBorder p="md" radius="md">
                <Text fw={500} mb="xs">{news.headline}</Text>
                <Text size="sm" mb="md">{news.summary}</Text>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">{news.date}</Text>
                  <Text size="xs" c="blue" component="a" href={news.link} target="_blank">
                    Read more
                  </Text>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Card>
      </Stack>
    </div>
  );
}

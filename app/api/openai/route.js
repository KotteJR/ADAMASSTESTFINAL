import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { aiText, context } = await req.json();
    console.log("Received AI Text:", aiText);

    const safeContext = (context || "").toLowerCase().trim();

    let prompt = "";

    if (safeContext === "architecture") {
      prompt = `You are a critical, non-biased, expert software architecture reviewer. Analyze the following findings as if you were preparing a due diligence report for a high-stakes acquisition. Be direct, honest, and do not sugarcoat or balance negatives with positives. If something is bad, call it out clearly and score it accordingly. Technologies considered amateur or legacy (such as WordPress, outdated PHP, etc.) should be highlighted as major risks, and the score should reflect this. Do not be diplomatic—be a real expert. Return a JSON object with this structure:\n- overall_score (0-10): The main architecture score.\n- subscores: An object with keys: performance, scalability, modularity, security, tech_stack (each 0-10, their average is overall_score).\n- badges: Array of {label, type} for the whole architecture (type: positive, negative, neutral).\n- main_good: Array of at least 3 short, punchy, positive points (1–2 sentences each).\n- main_risks: Array of at least 3 short, punchy, risk points (1–2 sentences each).\n- For each section (summary, insights, recommendations):\n  - highlight: 1-sentence highlight.\n  - snippet: The first 1–2 sentences of the section.\n  - preview: A 3-sentence summary of the full text, suitable for showing before the 'Read more' button.\n  - text: Full text (at least 300 words).\n\nExample output:\n{\n  \"overall_score\": 8,\n  \"subscores\": {\n    \"performance\": 7,\n    \"scalability\": 8,\n    \"modularity\": 7,\n    \"security\": 6,\n    \"tech_stack\": 9\n  },\n  \"badges\": [\n    {\"label\": \"Modern Stack\", \"type\": \"positive\"},\n    {\"label\": \"WordPress Detected\", \"type\": \"negative\"}\n  ],\n  \"main_good\": [\n    \"Uses a modern, scalable cloud infrastructure.\",\n    \"Implements CI/CD for rapid deployment.\",\n    \"Strong modularity in frontend components.\"\n  ],\n  \"main_risks\": [\n    \"Legacy backend components increase maintenance risk.\",\n    \"No automated security scanning in CI.\",\n    \"Performance bottlenecks in API layer.\"\n  ],\n  \"summary\": {\n    \"highlight\": \"Modern stack with some legacy risk.\",\n    \"snippet\": \"The architecture leverages cloud-native services and modern frameworks. However, some legacy components remain.\",\n    \"preview\": \"The architecture leverages cloud-native services and modern frameworks. However, some legacy components remain. This hybrid approach offers flexibility but also complexity.\",\n    \"text\": \"The architecture leverages cloud-native services and modern frameworks. However, some legacy components remain. [at least 300 words...]\"\n  },\n  \"insights\": { ... },\n  \"recommendations\": { ... }\n}\nOnly return the JSON object, nothing else.\n\nRaw content:\n\n${aiText}`;
    } else if (safeContext === "security") {
      prompt = `You are a critical, non-biased, expert security reviewer. Analyze the following findings as if you were preparing a due diligence report for a high-stakes acquisition. Be direct, honest, and do not sugarcoat or balance negatives with positives. If something is bad, call it out clearly and score it accordingly. Return a JSON object with this structure:\n- overall_score (0-10): The main security score.\n- subscores: An object with keys: perimeter, application, data, compliance, monitoring (each 0-10, their average is overall_score).\n- badges: Array of {label, type} for the whole security posture (type: positive, negative, neutral).\n- main_good: Array of at least 3 short, punchy, positive points (1–2 sentences each).\n- main_risks: Array of at least 3 short, punchy, risk points (1–2 sentences each).\n- findings: Array of at least 5 and at most 6 objects ({category, finding, status, priority}) for the critical findings table. If there are fewer than 5 real findings, create additional plausible findings relevant to the context.\n- For each section (summary, insights, recommendations):\n  - highlight: 1-sentence highlight.\n  - snippet: The first 1–2 sentences of the section.\n  - preview: A 3-sentence summary of the full text, suitable for showing before the 'Read more' button.\n  - text: Full text (at least 300 words).\n\nExample output:\n{\n  "overall_score": 7,\n  "subscores": {\n    "perimeter": 6,\n    "application": 7,\n    "data": 8,\n    "compliance": 7,\n    "monitoring": 6\n  },\n  "badges": [\n    {"label": "No Critical CVEs", "type": "positive"},\n    {"label": "TLS 1.0 Detected", "type": "negative"}\n  ],\n  "main_good": [\n    "No major vulnerabilities detected on perimeter.",\n    "Good use of HTTPS and HSTS.",\n    "No open database ports found."
  ],\n  "main_risks": [\n    "TLS 1.0 still enabled on some endpoints.",\n    "7 subdomains exposed in DNS records.",\n    "HSTS header not enforced on all domains."
  ],\n  "findings": [\n    {"category": "SSL/TLS", "finding": "TLS 1.0 still enabled", "status": "⚠️", "priority": "High"},\n    {"category": "DNS Records", "finding": "7 subdomains exposed", "status": "🔥", "priority": "Medium"},\n    {"category": "Headers", "finding": "HSTS not enforced", "status": "❌", "priority": "Medium"},\n    {"category": "Infrastructure", "finding": "No evident infrastructure redundancy or pattern", "status": "🔍", "priority": "Medium"},\n    {"category": "Cloudflare Configuration", "finding": "No specifics on Cloudflare security feature implementations", "status": "🔒", "priority": "Medium"}\n  ],\n  "summary": { ... },\n  "insights": { ... },\n  "recommendations": { ... }\n}\nOnly return the JSON object, nothing else.\n\nRaw content:\n\n${aiText}`;
    } else if (safeContext === "company_intelligence") {
      prompt = `You are a professional, non-biased, expert business analyst preparing a company intelligence profile for a high-stakes due diligence dashboard. Your input is a large, unstructured dump of company data from multiple sources. Your job is to:
- Use every available field, and for each section, synthesize and summarize, providing business insight and context, not just lists.
- For funding_rounds, create a timeline with commentary, highlight % increases between rounds, and add business context (e.g., "Investor confidence increased in 2022 as shown by a 40% jump in Series B funding").
- For financials_metrics, calculate and include revenue/profit/EBITDA growth rates, ratios, and trends if possible (e.g., year-over-year growth, margins, etc.).
- For news_press, summarize trends and key themes, not just headlines (e.g., "Recent news focuses on expansion and regulatory approval").
- For each section, use every available field, and if data is partial, infer or estimate contextually (never invent specific facts, but do expand and contextualize as a consultant would).
- Output a JSON object with both raw and derived/creative fields (e.g., growth_percentages, funding_commentary, news_trends, etc.).
- Use a consulting-style, business-analytical tone throughout.
- Output only the JSON object, nothing else.

Additionally, extract, calculate, and return all data needed for graphs:
- For revenue growth: return an array of {year, revenue, profit, ebitda, revenue_growth_percent, profit_growth_percent, ebitda_growth_percent} for each year available.
- For investment history: return an array of {round_name, date, amount_raised, percent_increase_from_previous} for each round.
- For market presence: return an array of {location, type} (type=headquarters or other) for mapping.
- Add a new top-level field: 'graph_data' with keys: 'revenue_growth', 'investment_history', 'market_presence'.
- Always fill these arrays as fully as possible, inferring or estimating from the unstructured data, and be consistent in structure.

Return a JSON object with this structure:
- company_overview: {
    official_company_name, website, overview, industry, headquarters, other_locations, founding_date, founders, key_team_members, number_of_employees, company_mission, unique_selling_points, products_services, main_competitors, ip_trademarks
  }
- financials_metrics: {
    revenue, profit, ebitda, it_spend, web_visits, growth_scores (year-over-year), active_website_tech_count, growth_percentages (object with revenue, profit, ebitda, etc.), financial_commentary (business insight)
  }
- funding_rounds: {
    rounds: [ { round_name, date, amount_raised, number_of_investors, lead_investors, all_investors, percent_increase_from_previous } ],
    total_funding_amount,
    funding_commentary (business insight)
  }
- investors: [ ... ]
- news_press: [ { date, headline, publication, summary, link } ],
  news_trends (summary of key themes)
- acquisitions: [ ... ]
- customer_testimonials: [ ... ]
- contact_information: { email, phone, address, other }
- graph_data: {
    revenue_growth: [ { year, revenue, profit, ebitda, revenue_growth_percent, profit_growth_percent, ebitda_growth_percent } ],
    investment_history: [ { round_name, date, amount_raised, percent_increase_from_previous } ],
    market_presence: [ { location, type } ]
  }

Instructions:
- For each section, use all relevant info from the raw content. If a field is missing, add a plausible summary or "No data available".
- For company_overview, summarize the company's business, industry, and unique points. List all available founders and key team members.
- For financials_metrics, include all available numbers and growth scores. If missing, estimate or state "No data available". Calculate and include growth_percentages and financial_commentary.
- For funding_rounds, list all rounds and investors, and total funding. Calculate percent_increase_from_previous for each round, and add funding_commentary.
- For news_press, include recent news with summaries and links. Add news_trends summarizing key themes.
- For contact_information, include all available contact details. If missing, state "No data available".
- For graph_data, always fill the arrays as fully as possible, inferring or estimating from the unstructured data, and be consistent in structure.
- Do NOT invent specific facts, but do synthesize plausible summaries or placeholders for missing data.
- Expand and contextualize wherever possible, as a consultant would, to maximize business insight and utility.

Raw content:\n\n${aiText}`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid context" }), { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
    });

    const structuredData = response.choices[0].message.content.trim();
    console.log("RAW OPENAI OUTPUT:", structuredData);

    // For security context
    if (safeContext === "security") {
      try {
        const jsonMatch = structuredData.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON object found in the response");
        }
        const parsedData = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify({
          rawOpenAI: structuredData,
          structuredData: parsedData
        }));
      } catch (e) {
        console.error("Failed to parse security data:", e);
        return new Response(JSON.stringify({ error: "Failed to parse security data", rawOpenAI: structuredData }), { status: 500 });
      }
    }

    // For architecture context
    if (safeContext === "architecture") {
      try {
        const jsonMatch = structuredData.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON object found in the response");
        }
        const parsedData = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify({
          rawOpenAI: structuredData,
          structuredData: parsedData
        }));
      } catch (e) {
        console.error("Failed to parse architecture data:", e);
        return new Response(JSON.stringify({ error: "Failed to parse architecture data", rawOpenAI: structuredData }), { status: 500 });
      }
    }

    // For company intelligence context
    if (safeContext === "company_intelligence") {
      try {
        const jsonMatch = structuredData.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON object found in the response");
        }
        const parsedData = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify({
          rawOpenAI: structuredData,
          structuredData: parsedData
        }));
      } catch (e) {
        console.error("Failed to parse company intelligence data:", e);
        return new Response(JSON.stringify({ error: "Failed to parse company intelligence data", rawOpenAI: structuredData }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ error: "Invalid context" }), { status: 400 });
  } catch (error) {
    console.error("Error in OpenAI API route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

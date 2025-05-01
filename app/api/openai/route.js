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
      prompt = `You are a due diligence analyst working on the architecture of a tech company. The following text contains technical findings from tools like BuiltWith, PageSpeed, and others. Without altering the content, consolidate the information into the following sections:

**Summary** – High-level overview of the architectural state.  
**Insights** – Noteworthy observations about the tech stack, frameworks, render strategies, and tooling.  
**Recommendations** – Clear technical suggestions for improving performance, scalability, or modularity.

Write ~300–400 words per section. If wordpress shows up, mention it, and explain why it is bad. But have equal focus for everything. So for every bad technology used, say it.

Raw content:\n\n${aiText}`;
    } else if (safeContext === "security") {
      prompt = `You are a due diligence analyst working on the security of a tech company. The following text contains external security findings from tools like DNSDumpster, Shodan, SecurityHeaders, and SSL Labs. Without altering the content, consolidate the information into the following sections:

**Summary** – High-level overview of the company's external security posture.  
**Insights** – Observed vulnerabilities, misconfigurations, or exposures.  
**Recommendations** – Concrete security remediations and best practices.

Write ~300–400 words per section.

Also, return a table of key technical findings based on the report.

Format as JSON like this:
[
  {
    "category": "SSL/TLS",
    "finding": "TLS 1.0 still enabled",
    "status": "⚠️",
    "priority": "High"
  },
  {
    "category": "Headers",
    "finding": "HSTS not enforced",
    "status": "❌",
    "priority": "Medium"
  }
]

Return only the JSON array after the main report. No explanations. Max 6 items. Should not only include one category, try to vary, and focus on biggest red flags, even if it includes only one category in that case.

Raw content:\n\n${aiText}`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid context" }), { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
    });

    const structuredData = response.choices[0].message.content.trim();

    // 👇 Extract findings table from the structuredData text
    let findingsTable = [];
    const tableMatch = structuredData.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (tableMatch) {
      try {
        findingsTable = JSON.parse(tableMatch[0]);
      } catch (err) {
        console.warn("Failed to parse findingsTable:", err);
      }
    }

    const scoringPrompt = `Analyze the following report and return a JSON object with four numeric scores between 1.0–10.0:

{
  "overall": [score],
  "architecture": [score],
  "performance": [score],
  "infra": [score]
}

Report:
${structuredData}`;

    const scoreResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: scoringPrompt }],
    });

    let scores = {};
    try {
      scores = JSON.parse(scoreResponse.choices[0].message.content.trim());
    } catch (e) {
      console.warn("Failed to parse score response:", scoreResponse.choices[0].message.content);
      scores = {
        overall: null,
        architecture: null,
        performance: null,
        infra: null
      };
    }

    return new Response(JSON.stringify({ structuredData, scores, findingsTable }), { status: 200 });

  } catch (error) {
    console.error("Error in OpenAI route:", error);
    return new Response(JSON.stringify({ error: "Failed to process AI data" }), { status: 500 });
  }
}

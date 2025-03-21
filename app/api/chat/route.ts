import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';
import PDFDocument from 'pdfkit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Scrape DNS, BuiltWith, and Employee Count ONLY
async function scrapeLimitedData(companyName: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const scrapedData: Record<string, string> = {};

  try {
    // BuiltWith scrape
    await page.goto(`https://builtwith.com/${companyName}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    scrapedData['BuiltWith'] = await page.evaluate(() => document.body.innerText.slice(0, 1000));

    // DNSDumpster scrape
    await page.goto('https://dnsdumpster.com/', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await page.type('#regularInput', companyName);
    await page.click('button[type=submit]');
    await page.waitForSelector('table.table', { timeout: 10000 });
    scrapedData['DNS Data'] = await page.evaluate(() => document.body.innerText.slice(0, 1000));

    // Employee count from LinkedIn
    await page.goto(`https://www.linkedin.com/company/${companyName.replace(/\s/g, '-').toLowerCase()}/about`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    scrapedData['Employees'] = await page.evaluate(() => {
      const elem = document.querySelector('.org-top-card-summary__staff-count');
      return elem ? elem.textContent || 'Not available' : 'Not available';
    });

  } catch (error) {
    console.error('❌ Scraping error:', error);
  } finally {
    await browser.close();
  }

  return scrapedData;
}

// PDF Generator
async function generatePDF(content: string, companyName: string) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.fontSize(20).text('Desktop Review', { align: 'center' }).moveDown();
    doc.fontSize(16).text(`Company: ${companyName}`, { align: 'center' }).moveDown(2);
    doc.fontSize(11).text(content, { align: 'left' });
    doc.end();
  });
}

const sessionHistory: Record<string, string[]> = {};

export async function POST(req: NextRequest) {
  try {
    const { message, commonName, legalName, downloadPDF, sessionId } = await req.json();

    if (!commonName || !legalName || !sessionId) {
      return NextResponse.json({ reply: 'Please provide all required fields.' }, { status: 400 });
    }

    if (!sessionHistory[sessionId]) sessionHistory[sessionId] = [];

    const scrapedData = await scrapeLimitedData(commonName);

    const structuredPrompt = `
      You are a professional analyst generating structured Desktop Reviews.
      Given:
      - Company: ${commonName}
      - Legal Name: ${legalName}
      - DNS Data: ${scrapedData['DNS Data'] || 'Unavailable'}
      - BuiltWith Stack: ${scrapedData['BuiltWith'] || 'Unavailable'}
      - Employee Count: ${scrapedData['Employees'] || 'Unavailable'}

      Using your ability to search the web with GPT-4o, complete the following structured sections clearly:

      1. Sites
      2. Legal Name
      3. Core Business
      4. Products & Offerings
      5. Patents
      6. Technical Challenges/Opportunities
      7. Data Collection
      8. Competitors
      9. Key Traits for Business Context
      10. Google General
      11. Terms of Service
      12. Privacy Policy
      13. Ownership & Funding
      14. Leadership
      15. Customer Journey
      16. Review Websites
      17. Cybersecurity
      18. Tech Stack Analysis (use provided BuiltWith data)
      19. Socialblade Analysis
      20. DNS & Infrastructure (use provided DNS data)
      21. API Security
      22. Cloud Security
      23. Employee Count (use provided LinkedIn employee count data)
      24. Assessment Summary

      Each section should clearly state findings or explicitly state "Information not available".
    `;

    const chatContext = sessionHistory[sessionId].concat([`User: ${message}`]).join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: structuredPrompt },
        { role: 'user', content: chatContext },
      ],
      max_tokens: 3500,
    });

    const reply = response.choices[0]?.message?.content || 'No response from AI.';
    sessionHistory[sessionId].push(`User: ${message}`, `AI: ${reply}`);

    if (downloadPDF) {
      const pdfBuffer = await generatePDF(reply, commonName);
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${commonName}_Desktop_Review.pdf"`,
        },
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ reply: 'Internal error. Please retry.' }, { status: 500 });
  }
}

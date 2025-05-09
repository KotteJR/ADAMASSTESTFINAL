"use client";

import { Title } from "@mantine/core";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CompanyIntelligenceProfile } from "./CompanyIntelligenceProfile";
import { Architecture } from "./Architecture";
import { Security } from "./Security";

export function FullReport() {
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    setDownloading(true);
    const input = document.getElementById('report-content');
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('full-report.pdf');
    setDownloading(false);
  };

  return (
    <div style={{ padding: "1rem", paddingTop: "1.5rem" }}>
      <button onClick={downloadPDF} disabled={downloading} style={{ marginBottom: 16, background: '#228BE6', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: downloading ? 'not-allowed' : 'pointer' }}>
        {downloading ? 'Preparing PDF...' : 'Download PDF'}
      </button>
      <div id="report-content">
        <Title order={2} mb={24}>Company Intelligence Profile</Title>
        <CompanyIntelligenceProfile />
        <Title order={2} mb={24} mt={48}>Architecture</Title>
        <Architecture />
        <Title order={2} mb={24} mt={48}>Security</Title>
        <Security />
      </div>
    </div>
  );
}

"use client";

import {
  TextInput,
  Button,
  Group,
  Box,
  Stack,
  Title,
  Paper,
  Divider,
  Loader,
} from "@mantine/core";
import { useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { v4 as uuidv4 } from "uuid";

export function CompanyInformation() {
  const [companyName, setCompanyName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [country, setCountry] = useState("");
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    const jobId = uuidv4();

    const payload = {
      company_name: companyName,
      legal_name: legalName,
      country,
      url: domain,
      job_id: jobId,
    };

    try {
      const res = await fetch("/api/trigger-intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to trigger workflow");

      localStorage.setItem("currentJobId", jobId);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while triggering the workflow.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="lg">
      <div style={{ paddingLeft: "0.25rem", paddingBottom: "1.5rem" }}>
        <Title order={1} style={{ color: "#003366" }}>
          Company Information
        </Title>
      </div>

      <Group align="stretch" grow wrap="nowrap" mb="md">
        {/* LEFT: Company Info */}
        <Paper
          withBorder
          p="md"
          radius="md"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack gap="md">
            <TextInput
              label="Company Alias"
              placeholder="Adamass"
              value={companyName}
              onChange={(e) => setCompanyName(e.currentTarget.value)}
              required
            />
            <TextInput
              label="Legal Name"
              placeholder="Adamass AB"
              value={legalName}
              onChange={(e) => setLegalName(e.currentTarget.value)}
              required
            />
            <TextInput
              label="Country of Incorporation"
              placeholder="Sweden"
              value={country}
              onChange={(e) => setCountry(e.currentTarget.value)}
              required
            />
            <TextInput
              label="Company Domain"
              placeholder="www.url.com"
              value={domain}
              onChange={(e) => setDomain(e.currentTarget.value)}
              required
            />
          </Stack>
        </Paper>

        {/* RIGHT: File Upload */}
        <Paper
          withBorder
          p="lg"
          radius="md"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropzone
            onDrop={(files) => console.log("Files:", files)}
            styles={{
              root: {
                border: "1px dashed #ccc",
                padding: "2rem",
                width: "100%",
                height: "100%",
                textAlign: "center",
                cursor: "pointer",
              },
            }}
          >
            <div style={{ fontSize: "1rem", color: "dimmed" }}>
              Drag files here or click to upload
            </div>
          </Dropzone>
        </Paper>
      </Group>

      <Divider my="lg" />

      {error && (
        <Box style={{ color: "red", marginBottom: "1rem" }}>{error}</Box>
      )}

      <Button onClick={handleSubmit} loading={isLoading}>
        Generate Report →
      </Button>
    </Box>
  );
}

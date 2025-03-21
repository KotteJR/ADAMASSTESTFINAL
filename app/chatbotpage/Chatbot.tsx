"use client";

import { TextInput, Button, Text, Title } from "@mantine/core";
import classes from "./Chatbot.module.scss";
import { useState } from "react";
import { IconThumbUp, IconThumbDown, IconRepeat } from "@tabler/icons-react";

export function Chatbot() {
  const [selectedSection, setSelectedSection] = useState('Overview');

  const sections = [
    'Overview',
    'Timeline',
    'Stock Performance',
    'Financials Summary',
    'Earnings Call Transcripts',
    'Valuation & Funding',

  ];

  return (
    <div className={classes.dashboardWrapper}>
      {/* Left Panel */}
      <div className={classes.leftPanel}>
        <TextInput label="Company Name" placeholder="e.g. Apple" required />
        <TextInput label="Legal Name" placeholder="e.g. Apple Inc" required />

        <div className={classes.aiLogs}>
          <p>Fetching....</p>
          <p>Fetching....</p>
          <p>Scraped.....</p>
          <p>Failed scraping....</p>
        </div>

        <Button className={classes.generateButton} fullWidth>
          Generate →
        </Button>
      </div>

      {/* Middle Panel */}
      <div className={classes.middlePanel}>
        <div className={classes.contentWrapper}>
          <div className={classes.navbar}>
            {sections.map((section) => (
              <p 
                key={section} 
                className={`${classes.navItem} ${selectedSection === section ? classes.active : ''}`}
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </p>
            ))}
          </div>

          <div className={classes.contentDisplay}>
            <Title className={classes.title}>{selectedSection}</Title>
            <Text className={classes.description}>
              This is example text for the {selectedSection} section. Detailed content will appear here.
            </Text>
          </div>
        </div>

        <div className={classes.buttonGroup}>
          <Button className={classes.saveButton} fullWidth>Save →</Button>
          <Button className={classes.downloadButton} fullWidth>Download PDF →</Button>
        </div>
      </div>

      <div className={classes.rightPanel}>
      {/* Chat Area */}
      <div className={classes.chatArea}>
        <div className={classes.chatMessage}>
          It seems like you may have typed some random characters. Let me know if you need assistance with something specific.
        </div>

        {/* Chat Icons for Like, Dislike, etc. */}
        <div className={classes.chatIcons}>
          <IconThumbUp />
          <IconThumbDown />
          <IconRepeat />
        </div>
      </div>

      {/* Chat Input */}
      <div className={classes.chatInput}>
        <TextInput placeholder="Ask anything" />
        <Button className={classes.sendButton}>Send →</Button>
      </div>
      </div>
    </div>
  );
}

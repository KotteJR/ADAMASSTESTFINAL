"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ChatbotSection.module.scss' 
import { Text, Button, Textarea, Input } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import overlayStyles from './overlay.module.scss';

interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export function ChatbotSection() {
  const [commonName, setCommonName] = useState<string>('');
  const [legalName, setLegalName] = useState<string>('');
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [desktopReviewGenerated, setDesktopReviewGenerated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set sessionId on mount
  useEffect(() => {
    if (!sessionId) {
      setSessionId(uuidv4());
    }
  }, [sessionId]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleGenerateReview = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/chat', {
        message: "Generate desktop review",
        commonName,
        legalName,
        downloadPDF: false,
        sessionId,
      });
      const aiMessage: Message = {
        sender: 'ai',
        content: response.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setDesktopReviewGenerated(true);
    } catch (error) {
      alert('Error generating desktop review. Please try again.');
    }
    setLoading(false);
  };

  const handleChatSubmit = async () => {
    if (!desktopReviewGenerated || !chatInput.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput(''); // Clear input after sending

    try {
      const response = await axios.post('/api/chat', {
        message: chatInput,
        commonName,
        legalName,
        downloadPDF: false,
        sessionId,
      });
      const aiMessage: Message = {
        sender: 'ai',
        content: response.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: 'ai',
        content: 'Error processing your query. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('/api/chat', {
        message: "Generate desktop review", // Use latest message or full history if desired
        commonName,
        legalName,
        downloadPDF: true,
        sessionId,
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${commonName}_Desktop_Review.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
            <div className={overlayStyles.overlay}>
                <h1 className={overlayStyles.comingSoonText}>Coming Soon</h1>
            </div>
    
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2>Free Desktop Review</h2>
        <Input
          placeholder="Commonly Known Name (e.g., Apple)"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
        />
        <Input
          placeholder="Legal Name (e.g., Apple Inc.)"
          value={legalName}
          onChange={(e) => setLegalName(e.target.value)}
        />
        <Button
          onClick={handleGenerateReview}
          loading={loading}
          className={styles.reviewButton}
          disabled={!commonName || !legalName} // Disable if fields are empty
        >
          Free Desktop Review
        </Button>
      </div>
      <div className={styles.rightPanel}>
        <h2>Chat with AI</h2>
        {!desktopReviewGenerated && (
          <div className={styles.lockedChat}>
            Generate Desktop Review First
          </div>
        )}
        {desktopReviewGenerated && (
          <>
            <div className={styles.reviewSuccess}>
              ✅ Desktop Review Generated — Start Chatting
            </div>
            <div className={styles.chatContainer} ref={chatContainerRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                  }`}
                >
                  <div className={styles.messageContent}>{msg.content}</div>
                  <div className={styles.messageTimestamp}>{msg.timestamp}</div>
                </div>
              ))}
            </div>
            <Textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything..."
              className={styles.textarea}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()} // Submit on Enter
            />
            <div className={styles.buttonGroup}>
              <Button onClick={handleChatSubmit} className={styles.sendButton}>
                Send
              </Button>
              <Button onClick={handleDownloadPDF} className={styles.pdfButton}>
                Download Complete Assessment
              </Button>
            </div>
          </>
        
        )}
      </div>
    </div>
    </>
  );
}
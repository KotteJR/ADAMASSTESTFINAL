"use client";

import { TextInput, Textarea, Button, Text, Title } from "@mantine/core";
import classes from "./contactform.module.scss";

export function ContactForm() {
  return (
    <div className={classes.contactWrapper}>
      <div className={classes.textContainer}>
        <Title className={classes.title}>Get in Touch</Title>
        <Text c="dimmed" size="lg">
          Whether you have a question about our services, need support, or simply want to connect — we're here to help.
          Drop us a message and our team will get back to you shortly.
        </Text>
      </div>

      <div className={classes.formWrapper}>
        <form className={classes.formContainer}>
          <TextInput label="Your Name" placeholder="Enter your full name" required />
          <TextInput label="Email Address" placeholder="Enter your email" type="email" required />
          <TextInput label="Phone Number" placeholder="+39 999 999999" required />
          <Textarea label="Message" placeholder="How can we help?" minRows={4} required />
          <Button className={classes.submitButton} fullWidth>
            Send Your Message
          </Button>
        </form>
      </div>
    </div>
  );
}

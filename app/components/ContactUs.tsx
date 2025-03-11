import {
  Button,
  Group,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef } from "react";
import { animate, scroll } from "@motionone/dom";
import { ContactIconsList } from "./ContactIcons";
import classes from "../styles/ContactUs.module.scss";

export function ContactUs() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionTitleRef.current) {
      scroll(
        animate(sectionTitleRef.current,
          {
            y: [-20, 0, 20],
            opacity: [0.2, 1, 0.2],
          },
          { easing: "ease-in-out", duration: 1.5 }
        ),
        { target: sectionTitleRef.current }
      );
    }
  }, []);

  return (
    <section className={classes.contactSection}>
      <h2 ref={sectionTitleRef} className={classes.sectionTitle}>
        Contact Us
      </h2>

      <div className={classes.wrapper}>
        <div className={classes.contactDetails}>
          <Text className={classes.description}>
            Please contact us using the form or the contact details below.
          </Text>
          <ContactIconsList />
        </div>

        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="Anything and Everything"
            minRows={4}
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group justify="flex-end">
            <Button className={classes.control}>Send message</Button>
          </Group>
        </div>
      </div>
    </section>
  );
}

import {
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from '../styles/ContactUs.module.scss';

export function ContactUs() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contactWrapper} id="contact-us"> {/* Added id for scrolling */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Text className={classes.description} mt="xs" mb={20}>
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
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              label="Your message"
              placeholder="Anything and Everything"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group justify="flex-end" mt="md">
              <Button className={classes.control}>Send message</Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
    </div>
  );
}

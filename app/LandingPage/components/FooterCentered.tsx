"use client"; // ✅ This makes the component a Client Component

import { IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group } from '@mantine/core';
import Image from 'next/image';  // Import Image from Next.js
import classes from '../styles/FooterCentered.module.scss';

const links = [
  { link: '#', label: 'Terms' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Careers' },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()} // ✅ Works only in a Client Component
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/* Use direct path to public folder for logo */}
        <Image src="/LOGO.png" alt="Custom Logo" height={25} width={120} />  {/* Path to public folder */}

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandLinkedin size={25} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}

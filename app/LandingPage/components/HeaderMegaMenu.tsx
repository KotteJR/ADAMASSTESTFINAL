"use client";

import Link from 'next/link';
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconNotification,
} from '@tabler/icons-react';

import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import classes from '../styles/HeaderMegaMenu.module.scss';
import Image from 'next/image';

const mockdata = [
  { icon: IconBook, title: 'Due Diligence', description: 'In-depth research and market evaluation.', link: '/duediligence' },
  { icon: IconChartPie3, title: 'Capital Advisory', description: 'Investor insights and funding strategies.', link: '/capitaladvisory' },
  { icon: IconNotification, title: 'Strategic Advisory', description: 'Tailored strategies for business growth.', link: '/strategicadvisory' },
  { icon: IconNotification, title: 'AI Desktop Review', description: 'AI Powered Instant Desktop Reviews', link: '/chatbotpage' },

];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useMantineTheme();

  // SCROLL LOGIC — Ensures hide-on-scroll + appear-on-scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setIsVisible(true); // Show when scrolling up or at top
      }

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsVisible(false); // Hide when scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = mockdata.map((item) => (
    <Link href={item.link || "#"} key={item.title} className={classes.subLink}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </Link>
  ));

  return (
    <Box pb={0}>
      <header
        className={`${classes.header} 
        ${isVisible ? classes.visible : classes.hidden} 
        ${isScrolled ? classes.scrolled : ''}`}
      >
        <Group justify="space-between" h="100%">

          <Image
            src="/LOGO.png"
            alt="Adamass Logo"
            width={100}
            height={20}
            priority
          />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/LandingPage" className={classes.link}>Home</Link>
            <Link href="/portfolio" className={classes.link}>Portfolio</Link>

            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Solutions
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Solutions</Text>
                </Group>

                <Divider my="sm" />
                <SimpleGrid cols={2} spacing={0}>{links}</SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/contact" className={classes.link}>Contact</Link>
          </Group>

          <Group visibleFrom="sm">
            <Button>Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          <div className={classes.drawerLinksContainer}>
            <Link
              href="/LandingPage"
              className={`${classes.drawerLink} drawerLink`}
              onClick={closeDrawer}
            >
              Home
            </Link>

            <Link
              href="/portfolio"
              className={`${classes.drawerLink} drawerLink`}
              onClick={closeDrawer}
            >
              Portfolio
            </Link>

            <UnstyledButton
              className={`${classes.drawerLink} ${classes.solutionsLink}`}
              onClick={toggleLinks}
            >
              <Text fw={500} style={{ flex: 1 }}>Solutions</Text>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </UnstyledButton>

            <Collapse in={linksOpened}>
              <div className={classes.subLinkContainer}>
                {mockdata.map(item => (
                  <Link
                    href={item.link}
                    key={item.title}
                    onClick={closeDrawer}
                    className={classes.subLink}
                  >
                    <ThemeIcon size={34} variant="default" radius="md">
                      <item.icon size={22} color={theme.colors.blue[6]} />
                    </ThemeIcon>

                    <div className={classes.text}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Collapse>

            <Link
              href="/contact"
              className={`${classes.drawerLink} drawerLink`}
              onClick={closeDrawer}
            >
              Contact
            </Link>
          </div>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button onClick={closeDrawer}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

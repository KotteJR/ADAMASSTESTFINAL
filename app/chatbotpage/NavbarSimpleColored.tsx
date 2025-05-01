import {
    Icon2fa,
    IconCircleDottedLetterG,
    IconList,
    IconDatabaseImport,
    IconFingerprint,
    IconKey,
    IconLogout,
    IconReceipt2,
    IconSettings,
    IconSwitchHorizontal,
    IconCpu,
    IconMoodSearch,
    IconScoreboard,
  } from '@tabler/icons-react';
  import { Code, Group } from '@mantine/core';
  import classes from './NavbarSimpleColored.module.css';
  
  type NavbarSimpleColoredProps = {
    active: string;
    onChange: (label: string) => void;
  };
  
  const data = [
    { label: 'Company Information', icon: IconList },
    { label: 'Company Intelligence Profile', icon: IconReceipt2 },
    { label: 'Architecture', icon: IconDatabaseImport },
    { label: 'Security', icon: IconFingerprint },
    { label: 'Human Capital', icon: IconMoodSearch },
    { label: 'Adamass Scores', icon: IconScoreboard },
    { label: 'Full Report', icon: IconCpu },
  ];
  
  export function NavbarSimpleColored({ active, onChange }: NavbarSimpleColoredProps) {
    const links = data.map((item) => (
      <a
        className={classes.link}
        data-active={item.label === active || undefined}
        href="#"
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          onChange(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ));
  
    return (
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="">
            {/* Use your custom logo */}
            <img
              src="/logo-white.png"  // This is the path to your logo
              alt="Custom Logo"
              style={{ width: '120px', height: '26px', marginLeft: '1rem' }} // Adjust the size here
            />
          </Group>
          {links}
        </div>
  
        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Sign In</span>
          </a>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Back to Home</span>
          </a>
        </div>
      </nav>
    );
  }
  
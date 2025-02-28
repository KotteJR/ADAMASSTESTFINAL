import "./globals.scss";
import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { HeaderSimple } from "./components/Header";

export const metadata: Metadata = {
  title: "Adamass",
};

// ✅ Create a theme that applies "Inter" globally
const theme = createTheme({
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <HeaderSimple />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}

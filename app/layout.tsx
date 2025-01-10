
import { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "next-kit",
  description: "Next-js Fullstack Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body className={`${GeistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

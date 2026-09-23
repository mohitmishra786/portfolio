import type { Metadata } from "next";
import { geist, geistMono } from "@/lib/utils/fonts";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DataPrefetcher } from "@/components/layout/DataPrefetcher";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { personJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohit Mishra | Systems Programming & OS Development",
    template: "%s | Mohit Mishra",
  },
  description:
    "Mohit Mishra (Chessman), systems programmer. Build Distributed Systems has 5,000+ users. LowLevelCraft has 1,556+ registered users. amILearningEnough has 1,356 GitHub stars.",
  keywords: [
    "Mohit Mishra",
    "Chessman",
    "systems programming",
    "low-level programming",
    "OS development",
    "C",
    "Rust",
    "developer portfolio",
    "open source",
  ],
  authors: [{ name: "Mohit Mishra" }],
  creator: "Mohit Mishra",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mohit Mishra | Systems Programming & OS Development",
    description:
      "Systems programmer. Build Distributed Systems (5,000+ users), LowLevelCraft (1,556+ users), and the amILearningEnough roadmap (1,356 GitHub stars).",
    siteName: "Mohit Mishra",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Mishra | Systems Programming & OS Development",
    description:
      "Systems programmer. Build Distributed Systems (5,000+ users) and LowLevelCraft (1,556+ users).",
    creator: "@chessMan786",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <DataPrefetcher />
            <Header />
            <main id="content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

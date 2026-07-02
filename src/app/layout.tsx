import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/utils/fonts";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DataPrefetcher } from "@/components/layout/DataPrefetcher";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mohitmishra7.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohit Mishra | Systems Programming & OS Development",
    template: "%s | Mohit Mishra",
  },
  description:
    "Portfolio of Mohit Mishra (Chessman) — systems programmer, low-level engineering specialist, and open-source author. 2.4k+ GitHub stars across developer tooling, AI, and systems work.",
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
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mohit Mishra | Systems Programming & OS Development",
    description:
      "Systems programmer and open-source author — developer tooling, AI integration, and low-level engineering. 2.4k+ GitHub stars.",
    siteName: "Mohit Mishra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Mishra | Systems Programming & OS Development",
    description:
      "Systems programmer and open-source author — developer tooling, AI, and low-level engineering.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <DataPrefetcher />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

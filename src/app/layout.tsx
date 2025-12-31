import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/utils/fonts";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DataPrefetcher } from "@/components/layout/DataPrefetcher";

export const metadata: Metadata = {
  title: "Mohit Mishra | Systems Programming & OS Development",
  description: "Portfolio of Mohit Mishra, a specialist in systems programming, OS development, and low-level engineering.",
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
      </body>
    </html>
  );
}

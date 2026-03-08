import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cornerstone.or.ke'),
  title: {
    default: "The Cornerstone Foundation | Empowering Communities",
    template: "%s | Cornerstone Foundation",
  },
  description: "Credible, transparent and compassionate community impact through healthcare, support, and education in Kenya.",
  keywords: ["NGO", "Kenya", "charity", "Cornerstone Foundation", "healthcare", "education", "community impact", "donate", "non-profit", "Nairobi"],
  openGraph: {
    title: "The Cornerstone Foundation",
    description: "Credible, transparent and compassionate community impact.",
    url: "https://cornerstone.or.ke",
    siteName: "Cornerstone Foundation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Cornerstone Foundation Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cornerstone Foundation",
    description: "Credible, transparent and compassionate community impact.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

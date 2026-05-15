import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Toolzia — Free AI-Powered Tools",
    template: "%s | Toolzia",
  },
  description:
    "Toolzia offers free, powerful AI tools — remove image backgrounds instantly, generate unique usernames, craft perfect Instagram bios, and more. No signup required.",
  keywords: [
    "AI tools",
    "background remover",
    "username generator",
    "Instagram bio generator",
    "free online tools",
    "Toolzia",
  ],
  authors: [{ name: "Toolzia" }],
  creator: "Toolzia",
  metadataBase: new URL("https://toolzia.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolzia.com",
    siteName: "Toolzia",
    title: "Toolzia — Free AI-Powered Tools",
    description:
      "Remove backgrounds, generate usernames, craft Instagram bios and more — all for free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolzia AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolzia — Free AI-Powered Tools",
    description: "Remove backgrounds, generate usernames, craft Instagram bios and more.",
    images: ["/og-image.png"],
    creator: "@toolzia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

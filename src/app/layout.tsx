import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FloatingSidebar from "./components/FloatingSidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import ContentWrapper from "./components/ContentWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: "IEEE SWC Club | Robotics & AI Innovation",
  description: "Building the future through robotics, machine learning, and engineering innovation. Join our IEEE student community of makers, coders, and engineers.",
  keywords: ["IEEE", "SWC", "Southwestern College", "robotics", "machine learning", "arduino", "engineering", "student branch"],
  authors: [{ name: "IEEE SWC Club" }],
  robots: "index, follow",
  openGraph: {
    title: "IEEE SWC Club | Robotics & AI Innovation",
    description: "Building the future through robotics, machine learning, and engineering innovation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE SWC Club | Robotics & AI Innovation",
    description: "Building the future through robotics, machine learning, and engineering innovation.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <SidebarProvider>
          <FloatingSidebar />
          <ContentWrapper>
        {children}
          </ContentWrapper>
          <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)] py-8 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="font-mono text-sm text-[var(--text-secondary)]">
                <span className="syntax-comment">// Built with ❤️ by the IEEE SWC Club</span>
              </div>
              <div className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                <span className="syntax-keyword">const</span> <span className="syntax-variable">year</span> = <span className="syntax-string">"{new Date().getFullYear()}"</span>;
              </div>
            </div>
          </footer>
        </SidebarProvider>
      </body>
    </html>
  );
}

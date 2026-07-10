import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeScript } from "@/components/shared/ThemeToggle";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar, BackToTop } from "@/components/layout/ScrollEffects";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { fetchPortfolioProfile } from "@/lib/fetchData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satnam Kumar | Python Developer Portfolio",
  description:
    "Portfolio of Satnam Kumar — B.Tech CSE Student, Python Developer, Cloud & Cybersecurity Learner. Explore projects, experience, and certifications.",
  keywords: [
    "Satnam Kumar",
    "Python Developer",
    "Portfolio",
    "Computer Science",
    "Python",
    "AI",
  ],
  authors: [{ name: "Satnam Kumar" }],
  openGraph: {
    title: "Satnam Kumar | Portfolio",
    description: "Python Developer | Cloud & Cybersecurity Learner",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolio = await fetchPortfolioProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <CursorSpotlight />
          <ScrollProgressBar />
          <Navbar portfolio={portfolio} />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

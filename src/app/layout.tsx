import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "@/components/BubbleMenu.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanshuraj.com"),
  title: {
    default: "Priyanshu Raj — Frontend & Visual Designer",
    template: "%s | Priyanshu Raj",
  },
  description: "Portfolio of Priyanshu Raj, a Frontend Developer specializing in brutalist design, creative development, and interactive web experiences.",
  keywords: ["Frontend Developer", "Web Designer", "Brutalist Web Design", "React", "Next.js", "Creative Developer", "Priyanshu Raj"],
  authors: [{ name: "Priyanshu Raj" }],
  creator: "Priyanshu Raj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://priyanshuraj.com",
    title: "Priyanshu Raj — Frontend & Visual Designer",
    description: "Portfolio of Priyanshu Raj, a Frontend Developer specializing in brutalist design, creative development, and interactive web experiences.",
    siteName: "Priyanshu Raj Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Raj — Frontend & Visual Designer",
    description: "Portfolio of Priyanshu Raj, a Frontend Developer specializing in brutalist design.",
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

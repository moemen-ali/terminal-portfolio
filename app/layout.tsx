import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const url = "https://moemen-ali.netlify.app"
const title = "Moemen Ali — Frontend Engineer"
const description =
  "Senior Frontend Engineer with 4+ years building large-scale Angular apps. Explore my projects, skills, and experience — right from the terminal."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "Moemen Ali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@moemenelsayeh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

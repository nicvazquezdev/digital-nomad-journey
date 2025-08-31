import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateJsonLd } from "./lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Nomad Journey",
    template: "%s | Digital Nomad Journey",
  },
  description:
    "Join Nicolas Vazquez on his digital nomad journey across 16+ countries. Explore authentic travel experiences, stunning photography, and honest reviews of destinations from Japan to Portugal, Thailand to Hungary. Your guide to remote work and world travel.",
  keywords: [
    "digital nomad",
    "travel blog",
    "Nicolas Vazquez",
    "remote work",
    "world travel",
    "travel photography",
    "travel experiences",
    "backpacking",
    "solo travel",
    "nomad lifestyle",
    "Japan travel",
    "Thailand travel",
    "Europe travel",
    "Southeast Asia",
    "travel guide",
    "travel stories",
    "destination reviews",
    "travel inspiration",
  ],
  authors: [{ name: "Nicolas Vazquez" }],
  creator: "Nicolas Vazquez",
  publisher: "Nicolas Vazquez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://traveler-journey.vercel.app",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Digital Nomad Journey",
    description:
      "Join Nicolas Vazquez on his digital nomad journey across 16+ countries. Explore authentic travel experiences, stunning photography, and honest reviews of destinations worldwide.",
    siteName: "Digital Nomad Journey",
    images: [
      {
        url: "/assets/japan/IMG_9838 2.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Nomad Journey - Travel Photography from Japan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Nomad Journey",
    description:
      "Join Nicolas Vazquez on his digital nomad journey across 16+ countries. Authentic travel experiences and stunning photography.",
    images: ["/assets/japan/IMG_9838 2.jpg"],
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
  const jsonLd = generateJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

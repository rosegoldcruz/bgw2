// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "BGW Doors — Premium doors for modern spaces.",
  description: "BGW Doors crafts luxury fiberglass, wood, and iron doors engineered for nationwide projects.",
  generator: "AEON",
  alternates: {
    canonical: "https://bgwdoors.com/",
  },
  openGraph: {
    siteName: "BGW Doors",
    title: "Premium doors for modern spaces | BGW Doors",
    description: "BGW Doors crafts luxury fiberglass, wood, and iron doors engineered for nationwide projects.",
    type: "website",
    url: "https://bgwdoors.com/",
    images: [
      {
        url: "https://bgw2.vercel.app/bgw-hero.png",
        alt: "BGW Doors showroom featuring modern fiberglass, wood, and iron doors",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium doors for modern spaces | BGW Doors",
    description: "BGW Doors crafts luxury fiberglass, wood, and iron doors engineered for nationwide projects.",
    images: [
      {
        url: "https://bgw2.vercel.app/bgw-hero.png",
        alt: "BGW Doors showroom featuring modern fiberglass, wood, and iron doors",
      },
    ],
    site: "@bgwdoors",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-900 text-white overflow-x-hidden">{children}</body>
    </html>
  )
}

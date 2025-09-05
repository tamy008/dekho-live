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
  title: "Dekho Live - India's Premier Live Shopping Platform",
  description:
    "Experience the future of shopping with India's most vibrant live commerce platform. Watch, interact, and buy from authentic sellers in real-time.",
  keywords: "live shopping, india, ecommerce, online shopping, live streaming, authentic products, neon, futuristic",
  authors: [{ name: "Dekho Live Team" }],
  creator: "Dekho Live",
  publisher: "Dekho Live",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dekho-live.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dekho Live - India's Premier Live Shopping Platform",
    description: "Experience the future of shopping with India's most vibrant live commerce platform.",
    url: "https://dekho-live.vercel.app",
    siteName: "Dekho Live",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/dekho-logo.png",
        width: 1200,
        height: 630,
        alt: "Dekho Live - Futuristic Live Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dekho Live - India's Premier Live Shopping Platform",
    description: "Experience the future of shopping with India's most vibrant live commerce platform.",
    creator: "@dekholive",
    images: ["/dekho-logo.png"],
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
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-large.png" />
        <meta name="theme-color" content="#FF1CF7" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-deep-black text-white overflow-x-hidden">{children}</body>
    </html>
  )
}

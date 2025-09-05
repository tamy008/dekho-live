import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dekho Live - India's Premier Live Shopping Platform | देखो लाइव",
  description:
    "Join India's most exciting live shopping experience! Discover authentic products, interact with sellers, and shop from the comfort of your home. Fashion, electronics, home decor और बहुत कुछ!",
  keywords:
    "live shopping, india, online shopping, live stream, fashion, electronics, home decor, authentic products, indian brands, dekho live",
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
    description:
      "Join India's most exciting live shopping experience! Discover authentic products, interact with sellers, and shop from home.",
    url: "https://dekho-live.vercel.app",
    siteName: "Dekho Live",
    images: [
      {
        url: "/dekho-logo.png",
        width: 1200,
        height: 630,
        alt: "Dekho Live - Live Shopping Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dekho Live - India's Premier Live Shopping Platform",
    description:
      "Join India's most exciting live shopping experience! Discover authentic products, interact with sellers, and shop from home.",
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
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-large.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF9933" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`} suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}

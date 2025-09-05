import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dekho - Discover Amazing Products",
  description:
    "Discover amazing products with our innovative platform featuring cutting-edge 3D effects and immersive experiences.",
  keywords: "products, discovery, 3D, interactive, shopping, platform",
  authors: [{ name: "Dekho Team" }],
  creator: "Dekho",
  publisher: "Dekho",
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
    title: "Dekho - Discover Amazing Products",
    description:
      "Discover amazing products with our innovative platform featuring cutting-edge 3D effects and immersive experiences.",
    url: "https://dekho-live.vercel.app",
    siteName: "Dekho",
    images: [
      {
        url: "/dekho-logo.png",
        width: 1200,
        height: 630,
        alt: "Dekho Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dekho - Discover Amazing Products",
    description:
      "Discover amazing products with our innovative platform featuring cutting-edge 3D effects and immersive experiences.",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-large.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f23" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}

import type React from "react"
import "./globals.css"
import { Suspense } from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Dekho - Digital Experience Platform",
  description: "Immerse yourself in next-generation streaming, shopping, and content creation.",
  keywords: "live streaming, social commerce, content creation, digital platform",
  authors: [{ name: "Dekho Team" }],
  creator: "Dekho",
  publisher: "Dekho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dekho - Digital Experience Platform",
    description: "Immerse yourself in next-generation streaming, shopping, and content creation.",
    url: "https://dekho.vercel.app",
    siteName: "Dekho",
    images: [
      {
        url: "/og-image.webp",
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
    title: "Dekho - Digital Experience Platform",
    description: "Immerse yourself in next-generation streaming, shopping, and content creation.",
    images: ["/og-image.webp"],
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
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
  ],
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4"></div>
        <div className="h-3 bg-white/20 rounded w-24"></div>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/dekho-logo.png" />

        {/* Critical CSS inlined for faster rendering */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0f0f23;color:#fff;line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            *{margin:0;padding:0;box-sizing:border-box}
            .animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
            .will-change-transform{will-change:transform}
            .gpu-accelerated{transform:translateZ(0);backface-visibility:hidden}
          `,
          }}
        />
      </head>
      <body className="antialiased gpu-accelerated">
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </body>
    </html>
  )
}

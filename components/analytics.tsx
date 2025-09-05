"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const Analytics = () => {
  useEffect(() => {
    // Google Analytics
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      const script = document.createElement("script")
      script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        window.gtag =
          window.gtag ||
          (() => {
            ;(window.gtag as any).q = (window.gtag as any).q || []
            ;(window.gtag as any).q.push(arguments)
          })
        window.gtag("js", new Date())
        window.gtag("config", "GA_MEASUREMENT_ID")
      }
    }

    // Performance monitoring
    if ("performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            console.log("Navigation timing:", entry)
          }
        }
      })
      observer.observe({ entryTypes: ["navigation"] })
    }
  }, [])

  return null
}

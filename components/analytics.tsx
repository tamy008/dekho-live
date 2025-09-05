"use client"

import Script from "next/script"

interface GoogleAnalyticsProps {
  measurementId: string
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Custom hook for tracking events
export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: parameters?.label || "",
        value: parameters?.value || 0,
        ...parameters,
      })
    }
  }

  const trackPageView = (url: string, title?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-BCQRNRQQ15", {
        page_title: title || document.title,
        page_location: url,
      })
    }
  }

  const trackPurchase = (transactionId: string, value: number, currency = "USD", items?: any[]) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items || [],
      })
    }
  }

  const trackSignUp = (method?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "sign_up", {
        method: method || "email",
      })
    }
  }

  const trackButtonClick = (buttonName: string, location?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "button",
        event_label: buttonName,
        event_location: location || "unknown",
      })
    }
  }

  const trackNavigation = (fromPage: string, toPage: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_navigation", {
        event_category: "navigation",
        from_page: fromPage,
        to_page: toPage,
      })
    }
  }

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackSignUp,
    trackButtonClick,
    trackNavigation,
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

"use client"

import { useMemo } from "react"

import { useEffect, useState, useCallback } from "react"

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
  })
  const [isSlowDevice, setIsSlowDevice] = useState(false)
  const [networkInfo, setNetworkInfo] = useState(null)

  // Memoized device detection
  const detectSlowDevice = useCallback(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const isSlowConnection = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g"
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4
    const isOldBrowser = !window.IntersectionObserver || !window.requestIdleCallback

    setNetworkInfo({
      effectiveType: connection?.effectiveType || "unknown",
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
    })

    return isSlowConnection || isLowEndDevice || isOldBrowser
  }, [])

  useEffect(() => {
    setIsSlowDevice(detectSlowDevice())

    // Optimized Web Vitals monitoring
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      const observers = []

      try {
        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
        })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
        observers.push(lcpObserver)
      } catch (e) {
        console.warn("LCP observer not supported")
      }

      try {
        // FID Observer
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            setMetrics((prev) => ({ ...prev, fid: entry.processingStart - entry.startTime }))
          })
        })
        fidObserver.observe({ entryTypes: ["first-input"] })
        observers.push(fidObserver)
      } catch (e) {
        console.warn("FID observer not supported")
      }

      try {
        // CLS Observer
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              setMetrics((prev) => ({ ...prev, cls: clsValue }))
            }
          })
        })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
        observers.push(clsObserver)
      } catch (e) {
        console.warn("CLS observer not supported")
      }

      try {
        // FCP Observer
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
          })
        })
        fcpObserver.observe({ entryTypes: ["paint"] })
        observers.push(fcpObserver)
      } catch (e) {
        console.warn("FCP observer not supported")
      }

      return () => {
        observers.forEach((observer) => observer.disconnect())
      }
    }
  }, [detectSlowDevice])

  // Performance score calculation
  const performanceScore = useMemo(() => {
    if (!metrics.lcp || !metrics.fcp) return null

    let score = 100

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp > 4000) score -= 30
    else if (metrics.lcp > 2500) score -= 15

    // FCP scoring (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
    if (metrics.fcp > 3000) score -= 25
    else if (metrics.fcp > 1800) score -= 10

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid > 300) score -= 20
    else if (metrics.fid > 100) score -= 10

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls > 0.25) score -= 25
    else if (metrics.cls > 0.1) score -= 10

    return Math.max(0, score)
  }, [metrics])

  return {
    metrics,
    isSlowDevice,
    networkInfo,
    performanceScore,
    shouldEnable3D: !isSlowDevice && performanceScore > 70,
  }
}

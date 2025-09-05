"use client"

import { useEffect, useState } from "react"

export function useEnhancedPerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState({
    // Hardware Detection
    cpuCores: navigator.hardwareConcurrency || 4,
    deviceMemory: navigator.deviceMemory || 4,

    // Browser Capabilities
    webglSupport: false,
    webgl2Support: false,
    cssTransformsSupport: false,

    // Performance Metrics
    renderingPerformance: "unknown",
    networkSpeed: "unknown",

    // User Preferences
    prefersReducedMotion: false,
    dataSaverEnabled: false,

    // Device Classification
    isLowEndDevice: false,
    isSlowConnection: false,
    shouldEnable3D: false,

    // Debug Info
    debugInfo: {},
  })

  const [overrideSettings, setOverrideSettings] = useState(null)

  useEffect(() => {
    // Listen for performance setting overrides
    const handleSettingsChange = (event) => {
      setOverrideSettings(event.detail)
    }

    window.addEventListener("performance-settings-changed", handleSettingsChange)

    // Load existing override settings
    try {
      const saved = localStorage.getItem("dekho-performance-settings")
      if (saved) {
        setOverrideSettings(JSON.parse(saved))
      }
    } catch (error) {
      console.warn("Failed to load performance override settings:", error)
    }

    return () => {
      window.removeEventListener("performance-settings-changed", handleSettingsChange)
    }
  }, [])

  useEffect(() => {
    const runPerformanceAnalysis = async () => {
      const results = {
        cpuCores: navigator.hardwareConcurrency || 4,
        deviceMemory: navigator.deviceMemory || 4,
        webglSupport: false,
        webgl2Support: false,
        cssTransformsSupport: false,
        renderingPerformance: "unknown",
        networkSpeed: "unknown",
        prefersReducedMotion: false,
        dataSaverEnabled: false,
        isLowEndDevice: false,
        isSlowConnection: false,
        shouldEnable3D: false,
        debugInfo: {},
      }

      // 1. WebGL Detection
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        const gl2 = canvas.getContext("webgl2")

        results.webglSupport = !!gl
        results.webgl2Support = !!gl2

        if (gl) {
          results.debugInfo.webglRenderer = gl.getParameter(gl.RENDERER)
          results.debugInfo.webglVendor = gl.getParameter(gl.VENDOR)
          results.debugInfo.webglVersion = gl.getParameter(gl.VERSION)

          // Check for software rendering (usually indicates poor GPU support)
          const renderer = gl.getParameter(gl.RENDERER).toLowerCase()
          const isSoftwareRenderer =
            renderer.includes("software") || renderer.includes("llvmpipe") || renderer.includes("mesa")

          results.debugInfo.isSoftwareRenderer = isSoftwareRenderer
        }
      } catch (error) {
        results.debugInfo.webglError = error.message
      }

      // 2. CSS 3D Transform Support
      const testElement = document.createElement("div")
      testElement.style.transform = "translateZ(0)"
      results.cssTransformsSupport = testElement.style.transform !== ""

      // 3. Performance Benchmarking
      try {
        const startTime = performance.now()

        // Simple rendering test
        const canvas = document.createElement("canvas")
        canvas.width = 200
        canvas.height = 200
        const ctx = canvas.getContext("2d")

        if (ctx) {
          for (let i = 0; i < 1000; i++) {
            ctx.fillStyle = `hsl(${i % 360}, 50%, 50%)`
            ctx.fillRect(Math.random() * 200, Math.random() * 200, 5, 5)
          }
        }

        const endTime = performance.now()
        const renderTime = endTime - startTime

        results.renderingPerformance = renderTime < 30 ? "high" : renderTime < 60 ? "medium" : "low"
        results.debugInfo.renderTime = renderTime
      } catch (error) {
        results.debugInfo.renderError = error.message
      }

      // 4. Network Detection
      if ("connection" in navigator) {
        const connection = navigator.connection
        results.networkSpeed = connection.effectiveType
        results.dataSaverEnabled = connection.saveData
        results.isSlowConnection = connection.effectiveType === "2g" || connection.effectiveType === "slow-2g"
        results.debugInfo.connection = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        }
      }

      // 5. User Preferences
      results.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // 6. Device Classification
      const isLowCPU = results.cpuCores < 4
      const isLowMemory = results.deviceMemory < 4
      const isSlowRendering = results.renderingPerformance === "low"
      const isSoftwareGL = results.debugInfo.isSoftwareRenderer

      results.isLowEndDevice = isLowCPU || isLowMemory || isSlowRendering || isSoftwareGL

      // 7. Final 3D Decision
      const hasGoodWebGL = results.webglSupport && !results.debugInfo.isSoftwareRenderer
      const hasGoodPerformance = !results.isLowEndDevice
      const hasGoodConnection = !results.isSlowConnection
      const userAllowsMotion = !results.prefersReducedMotion
      const noDataSaver = !results.dataSaverEnabled

      results.shouldEnable3D =
        hasGoodWebGL && hasGoodPerformance && hasGoodConnection && userAllowsMotion && noDataSaver

      // 8. Apply Overrides
      if (overrideSettings) {
        if (overrideSettings.force3DEffects) {
          results.shouldEnable3D = true
        }
        if (overrideSettings.disablePerformanceDetection) {
          results.shouldEnable3D = true
        }
        if (overrideSettings.reducedMotion) {
          results.prefersReducedMotion = true
          results.shouldEnable3D = false
        }

        results.debugInfo.overrideSettings = overrideSettings
      }

      results.debugInfo.finalDecisionFactors = {
        hasGoodWebGL,
        hasGoodPerformance,
        hasGoodConnection,
        userAllowsMotion,
        noDataSaver,
        overrideApplied: !!overrideSettings,
      }

      setPerformanceData(results)
    }

    runPerformanceAnalysis()
  }, [overrideSettings])

  return {
    ...performanceData,
    overrideSettings,
    // Helper methods
    getDebugInfo: () => performanceData.debugInfo,
    getRecommendations: () => {
      const recommendations = []

      if (!performanceData.webglSupport) {
        recommendations.push("Enable hardware acceleration in browser settings")
      }

      if (performanceData.debugInfo.isSoftwareRenderer) {
        recommendations.push("Update graphics drivers for better 3D performance")
      }

      if (performanceData.isLowEndDevice) {
        recommendations.push("Consider using performance mode or disabling 3D effects")
      }

      if (performanceData.isSlowConnection) {
        recommendations.push("3D effects disabled due to slow connection")
      }

      if (performanceData.prefersReducedMotion) {
        recommendations.push("Reduced motion preference detected - animations limited")
      }

      return recommendations
    },
  }
}

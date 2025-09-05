"use client"

import { useState, useRef } from "react"

interface DiagnosticResult {
  category: string
  test: string
  status: "pass" | "fail" | "warning" | "info"
  value: string | number | boolean
  recommendation?: string
}

export default function ThreeDDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: DiagnosticResult[] = []

    // 1. WebGL Support Detection
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      const gl2 = canvas.getContext("webgl2")

      results.push({
        category: "WebGL",
        test: "WebGL 1.0 Support",
        status: gl ? "pass" : "fail",
        value: !!gl,
        recommendation: !gl ? "Update your browser or enable hardware acceleration" : undefined,
      })

      results.push({
        category: "WebGL",
        test: "WebGL 2.0 Support",
        status: gl2 ? "pass" : "warning",
        value: !!gl2,
        recommendation: !gl2 ? "WebGL 2.0 provides better performance for complex 3D effects" : undefined,
      })

      if (gl) {
        // WebGL Capabilities
        const renderer = gl.getParameter(gl.RENDERER)
        const vendor = gl.getParameter(gl.VENDOR)
        const version = gl.getParameter(gl.VERSION)
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
        const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)

        results.push({
          category: "WebGL",
          test: "GPU Renderer",
          status: "info",
          value: renderer,
        })

        results.push({
          category: "WebGL",
          test: "GPU Vendor",
          status: "info",
          value: vendor,
        })

        results.push({
          category: "WebGL",
          test: "WebGL Version",
          status: "info",
          value: version,
        })

        results.push({
          category: "WebGL",
          test: "Max Texture Size",
          status: maxTextureSize >= 4096 ? "pass" : "warning",
          value: maxTextureSize,
          recommendation: maxTextureSize < 4096 ? "Low texture support may affect visual quality" : undefined,
        })

        // Test for common WebGL extensions
        const extensions = [
          "OES_texture_float",
          "OES_texture_half_float",
          "WEBGL_depth_texture",
          "EXT_texture_filter_anisotropic",
          "WEBGL_lose_context",
        ]

        extensions.forEach((ext) => {
          const supported = gl.getExtension(ext) !== null
          results.push({
            category: "WebGL Extensions",
            test: ext,
            status: supported ? "pass" : "warning",
            value: supported,
          })
        })
      }
    } catch (error) {
      results.push({
        category: "WebGL",
        test: "WebGL Error",
        status: "fail",
        value: error.message,
        recommendation: "WebGL initialization failed - check browser settings",
      })
    }

    // 2. Hardware Detection
    results.push({
      category: "Hardware",
      test: "CPU Cores",
      status: navigator.hardwareConcurrency >= 4 ? "pass" : "warning",
      value: navigator.hardwareConcurrency || "Unknown",
      recommendation:
        (navigator.hardwareConcurrency || 0) < 4 ? "Low CPU core count may affect 3D performance" : undefined,
    })

    if ("deviceMemory" in navigator) {
      const memory = (navigator as any).deviceMemory
      results.push({
        category: "Hardware",
        test: "Device Memory (GB)",
        status: memory >= 4 ? "pass" : "warning",
        value: memory,
        recommendation: memory < 4 ? "Low memory may cause 3D effects to be disabled" : undefined,
      })
    }

    // 3. Browser Detection
    const userAgent = navigator.userAgent
    const isChrome = /Chrome/.test(userAgent)
    const isFirefox = /Firefox/.test(userAgent)
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
    const isEdge = /Edg/.test(userAgent)

    results.push({
      category: "Browser",
      test: "Browser Type",
      status: "info",
      value: isChrome ? "Chrome" : isFirefox ? "Firefox" : isSafari ? "Safari" : isEdge ? "Edge" : "Other",
    })

    results.push({
      category: "Browser",
      test: "User Agent",
      status: "info",
      value: userAgent,
    })

    // 4. Performance API Tests
    if ("performance" in window && "memory" in performance) {
      const memory = (performance as any).memory
      results.push({
        category: "Performance",
        test: "JS Heap Size (MB)",
        status: "info",
        value: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      })

      results.push({
        category: "Performance",
        test: "JS Heap Limit (MB)",
        status: memory.jsHeapSizeLimit > 1000000000 ? "pass" : "warning",
        value: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
      })
    }

    // 5. Network Connection
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      results.push({
        category: "Network",
        test: "Connection Type",
        status: connection.effectiveType === "4g" ? "pass" : "warning",
        value: connection.effectiveType,
        recommendation:
          connection.effectiveType === "2g" || connection.effectiveType === "slow-2g"
            ? "Slow connection detected - 3D effects may be disabled"
            : undefined,
      })

      results.push({
        category: "Network",
        test: "Data Saver",
        status: connection.saveData ? "warning" : "pass",
        value: connection.saveData ? "Enabled" : "Disabled",
        recommendation: connection.saveData ? "Data saver mode may disable 3D effects" : undefined,
      })
    }

    // 6. Screen and Display
    results.push({
      category: "Display",
      test: "Screen Resolution",
      status: "info",
      value: `${screen.width}x${screen.height}`,
    })

    results.push({
      category: "Display",
      test: "Device Pixel Ratio",
      status: "info",
      value: window.devicePixelRatio,
    })

    results.push({
      category: "Display",
      test: "Color Depth",
      status: screen.colorDepth >= 24 ? "pass" : "warning",
      value: screen.colorDepth,
    })

    // 7. CSS 3D Transform Support
    const testElement = document.createElement("div")
    testElement.style.transform = "translateZ(0)"
    const supports3DTransforms = testElement.style.transform !== ""

    results.push({
      category: "CSS",
      test: "3D Transforms",
      status: supports3DTransforms ? "pass" : "fail",
      value: supports3DTransforms,
      recommendation: !supports3DTransforms ? "Browser doesn't support CSS 3D transforms" : undefined,
    })

    // 8. Animation Support
    const supportsAnimations = "animate" in document.createElement("div")
    results.push({
      category: "CSS",
      test: "Web Animations API",
      status: supportsAnimations ? "pass" : "warning",
      value: supportsAnimations,
    })

    // 9. Intersection Observer Support
    const supportsIntersectionObserver = "IntersectionObserver" in window
    results.push({
      category: "APIs",
      test: "Intersection Observer",
      status: supportsIntersectionObserver ? "pass" : "warning",
      value: supportsIntersectionObserver,
      recommendation: !supportsIntersectionObserver ? "Performance optimizations may not work" : undefined,
    })

    // 10. RequestAnimationFrame Support
    const supportsRAF = "requestAnimationFrame" in window
    results.push({
      category: "APIs",
      test: "RequestAnimationFrame",
      status: supportsRAF ? "pass" : "fail",
      value: supportsRAF,
      recommendation: !supportsRAF ? "Smooth animations require requestAnimationFrame" : undefined,
    })

    // 11. Local Storage (for settings)
    try {
      localStorage.setItem("test", "test")
      localStorage.removeItem("test")
      results.push({
        category: "Storage",
        test: "Local Storage",
        status: "pass",
        value: true,
      })
    } catch {
      results.push({
        category: "Storage",
        test: "Local Storage",
        status: "warning",
        value: false,
        recommendation: "Settings persistence may not work",
      })
    }

    // 12. Reduced Motion Preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    results.push({
      category: "Accessibility",
      test: "Prefers Reduced Motion",
      status: prefersReducedMotion ? "warning" : "pass",
      value: prefersReducedMotion,
      recommendation: prefersReducedMotion ? "User prefers reduced motion - 3D effects may be limited" : undefined,
    })

    // 13. Canvas Performance Test
    try {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          const startTime = performance.now()

          // Draw test pattern
          for (let i = 0; i < 1000; i++) {
            ctx.fillStyle = `hsl(${i % 360}, 50%, 50%)`
            ctx.fillRect(Math.random() * 200, Math.random() * 200, 10, 10)
          }

          const endTime = performance.now()
          const renderTime = endTime - startTime

          results.push({
            category: "Performance",
            test: "Canvas Render Time (ms)",
            status: renderTime < 50 ? "pass" : renderTime < 100 ? "warning" : "fail",
            value: Math.round(renderTime),
            recommendation: renderTime > 100 ? "Slow canvas performance detected" : undefined,
          })
        }
      }
    } catch (error) {
      results.push({
        category: "Performance",
        test: "Canvas Test",
        status: "fail",
        value: "Failed",
        recommendation: "Canvas rendering issues detected",
      })
    }

    setDiagnostics(results)
    setIsRunning(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "text-green-400"
      case "fail":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-blue-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return "✅"
      case "fail":
        return "❌"
      case "warning":
        return "⚠️"
      default:
        return "ℹ️"
    }
  }

  const groupedDiagnostics = diagnostics.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, DiagnosticResult[]>,
  )

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">🔍 3D Effects Diagnostics</h2>
        <p className="text-gray-300 mb-4">
          This tool analyzes your device and browser to identify potential issues with 3D rendering.
        </p>

        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {isRunning ? "Running Diagnostics..." : "Run 3D Diagnostics"}
        </button>
      </div>

      {/* Hidden canvas for performance testing */}
      <canvas ref={canvasRef} width={200} height={200} style={{ display: "none" }} />

      {diagnostics.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedDiagnostics).map(([category, results]) => (
            <div key={category} className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">{category}</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-gray-700 rounded">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{getStatusIcon(result.status)}</span>
                        <span className="font-medium">{result.test}</span>
                        <span className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-gray-300 text-sm">
                        Value: <span className="font-mono">{String(result.value)}</span>
                      </div>
                      {result.recommendation && (
                        <div className="text-yellow-300 text-sm mt-1">💡 {result.recommendation}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-900/30 p-3 rounded">
                <div className="text-2xl font-bold text-green-400">
                  {diagnostics.filter((d) => d.status === "pass").length}
                </div>
                <div className="text-sm text-gray-300">Passed</div>
              </div>
              <div className="bg-yellow-900/30 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-400">
                  {diagnostics.filter((d) => d.status === "warning").length}
                </div>
                <div className="text-sm text-gray-300">Warnings</div>
              </div>
              <div className="bg-red-900/30 p-3 rounded">
                <div className="text-2xl font-bold text-red-400">
                  {diagnostics.filter((d) => d.status === "fail").length}
                </div>
                <div className="text-sm text-gray-300">Failed</div>
              </div>
              <div className="bg-blue-900/30 p-3 rounded">
                <div className="text-2xl font-bold text-blue-400">
                  {diagnostics.filter((d) => d.status === "info").length}
                </div>
                <div className="text-sm text-gray-300">Info</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

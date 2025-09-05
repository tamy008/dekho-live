"use client"

import { Suspense } from "react"
import ThreeDDiagnostics from "../../components/debug/3d-diagnostics"
import PerformanceOverride from "../../components/debug/performance-override"
import { useEnhancedPerformanceMonitor } from "../../hooks/useEnhancedPerformanceMonitor"

export default function DebugPage() {
  const performanceData = useEnhancedPerformanceMonitor()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🔧 3D Effects Debug Center</h1>
          <p className="text-gray-300 text-lg">
            Comprehensive diagnostics and troubleshooting tools for 3D rendering issues.
          </p>
        </div>

        {/* Quick Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className={`p-4 rounded-lg ${performanceData.shouldEnable3D ? "bg-green-900/30 border border-green-500/30" : "bg-red-900/30 border border-red-500/30"}`}
          >
            <div className="text-2xl mb-2">{performanceData.shouldEnable3D ? "✅" : "❌"}</div>
            <div className="font-semibold">3D Effects Status</div>
            <div className="text-sm text-gray-300">{performanceData.shouldEnable3D ? "Enabled" : "Disabled"}</div>
          </div>

          <div
            className={`p-4 rounded-lg ${performanceData.webglSupport ? "bg-green-900/30 border border-green-500/30" : "bg-red-900/30 border border-red-500/30"}`}
          >
            <div className="text-2xl mb-2">{performanceData.webglSupport ? "🎮" : "🚫"}</div>
            <div className="font-semibold">WebGL Support</div>
            <div className="text-sm text-gray-300">{performanceData.webglSupport ? "Available" : "Not Available"}</div>
          </div>

          <div
            className={`p-4 rounded-lg ${performanceData.isLowEndDevice ? "bg-yellow-900/30 border border-yellow-500/30" : "bg-green-900/30 border border-green-500/30"}`}
          >
            <div className="text-2xl mb-2">{performanceData.isLowEndDevice ? "⚠️" : "🚀"}</div>
            <div className="font-semibold">Device Performance</div>
            <div className="text-sm text-gray-300">{performanceData.isLowEndDevice ? "Low-End" : "High-End"}</div>
          </div>

          <div
            className={`p-4 rounded-lg ${performanceData.prefersReducedMotion ? "bg-yellow-900/30 border border-yellow-500/30" : "bg-green-900/30 border border-green-500/30"}`}
          >
            <div className="text-2xl mb-2">{performanceData.prefersReducedMotion ? "🐌" : "⚡"}</div>
            <div className="font-semibold">Motion Preference</div>
            <div className="text-sm text-gray-300">{performanceData.prefersReducedMotion ? "Reduced" : "Normal"}</div>
          </div>
        </div>

        {/* Recommendations */}
        {performanceData.getRecommendations().length > 0 && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">💡 Recommendations</h2>
            <ul className="space-y-2">
              {performanceData.getRecommendations().map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Debug Information */}
        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔍 Debug Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-purple-400">Hardware</h3>
              <div className="space-y-1 text-sm font-mono">
                <div>CPU Cores: {performanceData.cpuCores}</div>
                <div>Device Memory: {performanceData.deviceMemory}GB</div>
                <div>Render Performance: {performanceData.renderingPerformance}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-400">Browser</h3>
              <div className="space-y-1 text-sm font-mono">
                <div>WebGL: {performanceData.webglSupport ? "Yes" : "No"}</div>
                <div>WebGL2: {performanceData.webgl2Support ? "Yes" : "No"}</div>
                <div>CSS 3D: {performanceData.cssTransformsSupport ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>

          {performanceData.debugInfo.webglRenderer && (
            <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
              <div className="font-semibold mb-2">WebGL Info:</div>
              <div className="font-mono text-xs space-y-1">
                <div>Renderer: {performanceData.debugInfo.webglRenderer}</div>
                <div>Vendor: {performanceData.debugInfo.webglVendor}</div>
                <div>Version: {performanceData.debugInfo.webglVersion}</div>
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Tools */}
        <Suspense fallback={<div className="bg-gray-800 rounded-lg p-8 animate-pulse">Loading diagnostics...</div>}>
          <ThreeDDiagnostics />
        </Suspense>

        {/* Performance Override Controls */}
        <PerformanceOverride />
      </div>
    </div>
  )
}

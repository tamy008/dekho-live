"use client"

import { useState, useEffect } from "react"

interface PerformanceSettings {
  force3DEffects: boolean
  disablePerformanceDetection: boolean
  enableDebugMode: boolean
  reducedMotion: boolean
  maxParticles: number
  animationQuality: "low" | "medium" | "high"
}

export default function PerformanceOverride() {
  const [settings, setSettings] = useState<PerformanceSettings>({
    force3DEffects: false,
    disablePerformanceDetection: false,
    enableDebugMode: false,
    reducedMotion: false,
    maxParticles: 50,
    animationQuality: "medium",
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("dekho-performance-settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (error) {
        console.warn("Failed to load performance settings:", error)
      }
    }
  }, [])

  const updateSetting = (key: keyof PerformanceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("dekho-performance-settings", JSON.stringify(newSettings))

    // Trigger a custom event to notify the app of settings changes
    window.dispatchEvent(new CustomEvent("performance-settings-changed", { detail: newSettings }))
  }

  const resetSettings = () => {
    const defaultSettings: PerformanceSettings = {
      force3DEffects: false,
      disablePerformanceDetection: false,
      enableDebugMode: false,
      reducedMotion: false,
      maxParticles: 50,
      animationQuality: "medium",
    }
    setSettings(defaultSettings)
    localStorage.setItem("dekho-performance-settings", JSON.stringify(defaultSettings))
    window.dispatchEvent(new CustomEvent("performance-settings-changed", { detail: defaultSettings }))
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors"
        title="Performance Settings"
      >
        ⚙️
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-6 rounded-lg shadow-xl z-50 w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Performance Settings</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white transition-colors">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm">Force 3D Effects</label>
          <input
            type="checkbox"
            checked={settings.force3DEffects}
            onChange={(e) => updateSetting("force3DEffects", e.target.checked)}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm">Disable Performance Detection</label>
          <input
            type="checkbox"
            checked={settings.disablePerformanceDetection}
            onChange={(e) => updateSetting("disablePerformanceDetection", e.target.checked)}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm">Debug Mode</label>
          <input
            type="checkbox"
            checked={settings.enableDebugMode}
            onChange={(e) => updateSetting("enableDebugMode", e.target.checked)}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm">Reduced Motion</label>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => updateSetting("reducedMotion", e.target.checked)}
            className="rounded"
          />
        </div>

        <div>
          <label className="text-sm block mb-2">Max Particles: {settings.maxParticles}</label>
          <input
            type="range"
            min="10"
            max="200"
            value={settings.maxParticles}
            onChange={(e) => updateSetting("maxParticles", Number.parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm block mb-2">Animation Quality</label>
          <select
            value={settings.animationQuality}
            onChange={(e) => updateSetting("animationQuality", e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <button
            onClick={resetSettings}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm transition-colors"
          >
            Apply & Reload
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-800 rounded text-xs">
        <div className="text-yellow-400 mb-1">⚠️ Debug Info:</div>
        <div>WebGL: {window.WebGLRenderingContext ? "✅" : "❌"}</div>
        <div>Hardware Concurrency: {navigator.hardwareConcurrency || "Unknown"}</div>
        <div>Device Memory: {(navigator as any).deviceMemory || "Unknown"}GB</div>
        <div>Connection: {(navigator as any).connection?.effectiveType || "Unknown"}</div>
      </div>
    </div>
  )
}

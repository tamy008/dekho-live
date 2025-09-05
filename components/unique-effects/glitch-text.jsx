"use client"

import { useState, useEffect } from "react"

export default function GlitchText({
  text,
  className = "",
  triggerOnHover = false,
  autoGlitch = true,
  glitchIntensity = "medium",
}) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState(text)

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const intensitySettings = {
    low: { duration: 100, frequency: 3000 },
    medium: { duration: 200, frequency: 2000 },
    high: { duration: 300, frequency: 1000 },
  }

  const settings = intensitySettings[glitchIntensity]

  const createGlitchText = () => {
    let result = ""
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.1 && text[i] !== " ") {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)]
      } else {
        result += text[i]
      }
    }
    return result
  }

  const triggerGlitch = () => {
    setIsGlitching(true)

    let glitchCount = 0
    const maxGlitches = 5

    const glitchInterval = setInterval(() => {
      setGlitchText(createGlitchText())
      glitchCount++

      if (glitchCount >= maxGlitches) {
        clearInterval(glitchInterval)
        setGlitchText(text)
        setIsGlitching(false)
      }
    }, 50)
  }

  useEffect(() => {
    if (autoGlitch && !triggerOnHover) {
      const interval = setInterval(triggerGlitch, settings.frequency)
      return () => clearInterval(interval)
    }
  }, [autoGlitch, triggerOnHover, settings.frequency])

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerOnHover ? triggerGlitch : undefined}
      style={{
        fontFamily: "monospace",
      }}
    >
      {/* Main Text */}
      <span
        className={`relative z-10 transition-all duration-100 ${isGlitching ? "text-shadow-glitch" : ""}`}
        style={{
          color: isGlitching ? "#ff0080" : "inherit",
          textShadow: isGlitching
            ? `
                2px 0 #00ffff,
                -2px 0 #ff0080,
                0 2px #ffff00,
                0 -2px #ff00ff
              `
            : "none",
        }}
      >
        {glitchText}
      </span>

      {/* Glitch Layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 z-0"
            style={{
              color: "#00ffff",
              transform: "translate(-2px, 0)",
              opacity: 0.8,
              animation: "glitch-1 0.2s infinite linear alternate-reverse",
            }}
          >
            {glitchText}
          </span>
          <span
            className="absolute top-0 left-0 z-0"
            style={{
              color: "#ff0080",
              transform: "translate(2px, 0)",
              opacity: 0.8,
              animation: "glitch-2 0.15s infinite linear alternate-reverse",
            }}
          >
            {glitchText}
          </span>
          <span
            className="absolute top-0 left-0 z-0"
            style={{
              color: "#ffff00",
              transform: "translate(0, -2px)",
              opacity: 0.6,
              animation: "glitch-3 0.1s infinite linear alternate-reverse",
            }}
          >
            {glitchText}
          </span>
        </>
      )}

      {/* Scan Lines */}
      {isGlitching && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.1) 2px,
                rgba(255, 255, 255, 0.1) 4px
              )
            `,
            animation: "scan-lines 0.1s linear infinite",
          }}
        />
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0% { transform: translate(-2px, 0); }
          20% { transform: translate(2px, 0); }
          40% { transform: translate(-2px, 0); }
          60% { transform: translate(2px, 0); }
          80% { transform: translate(-2px, 0); }
          100% { transform: translate(2px, 0); }
        }

        @keyframes glitch-2 {
          0% { transform: translate(2px, 0); }
          25% { transform: translate(-2px, 0); }
          50% { transform: translate(2px, 0); }
          75% { transform: translate(-2px, 0); }
          100% { transform: translate(2px, 0); }
        }

        @keyframes glitch-3 {
          0% { transform: translate(0, -2px); }
          33% { transform: translate(0, 2px); }
          66% { transform: translate(0, -2px); }
          100% { transform: translate(0, 2px); }
        }

        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </span>
  )
}

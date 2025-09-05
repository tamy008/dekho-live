"use client"

import { useEffect, useState } from "react"

export default function CSS3DBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-float"
        style={{
          background: "radial-gradient(circle, #FF1CF7 0%, transparent 70%)",
          left: `${mousePosition.x * 0.1}%`,
          top: `${mousePosition.y * 0.1}%`,
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full blur-2xl opacity-40 animate-float"
        style={{
          background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)",
          right: `${(100 - mousePosition.x) * 0.15}%`,
          bottom: `${(100 - mousePosition.y) * 0.15}%`,
          animationDelay: "1s",
        }}
      />

      <div
        className="absolute w-48 h-48 rounded-full blur-xl opacity-50 animate-float"
        style={{
          background: "radial-gradient(circle, #00FF9D 0%, transparent 70%)",
          left: `${mousePosition.x * 0.2}%`,
          bottom: `${(100 - mousePosition.y) * 0.1}%`,
          animationDelay: "2s",
        }}
      />

      {/* Geometric grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 28, 247, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Floating neon lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px opacity-20 animate-pulse"
            style={{
              background: "linear-gradient(90deg, transparent, #FF1CF7, transparent)",
              width: "200px",
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(255, 28, 247, 0.1) 0%, 
            rgba(0, 240, 255, 0.05) 50%, 
            transparent 100%)`,
        }}
      />
    </div>
  )
}
